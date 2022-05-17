import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {QueryParamsViewer} from '@interface/query-params.interface'
import {Actions, ofActionCompleted, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {
	CheckAuthorised,
	GetSessionStatus,
	ViewerPasscodes
} from '@shared/store/session/session.actions'
import {
	UserRequestedPasscode,
	ViewerSkippedLogin
} from '@shared/store/user/user.actions'
import {CheckAuthorisedResponse} from '@shared/store/websocket/websocket.response.actions'
import {from, Observable, of} from 'rxjs'
import {map, switchMap, tap} from 'rxjs/operators'
import {SnackConfig} from '@shared/configs/snack.config'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {UserState} from '@shared/store/user/user.state'
import {ICheckAuthorised} from '@interface/response/check-authorised'
import {SocketResponse} from '@interface/socket-response.interface'
import {ViewerLoginPopupComponent} from '@cmp/viewer-login-popup/viewer-login-popup.component'

@Injectable({providedIn: 'root'})
export class ViewerSessionGuard implements CanActivate {
	@SelectSnapshot(UserState.logged) private logged!: boolean

	constructor(
		private router: Router,
		private dialog: DialogService,
		private store: Store,
		private actions: Actions,
		private snackBar: MatSnackBar
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		_: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean | UrlTree {
		const {sessionId, bookingPasscodeHash, bookingPasscode, bookingToken} =
			route.queryParams as QueryParamsViewer
		const session = Number(sessionId)

		if (!sessionId && !bookingToken) {
			return from(this.router.navigate([AppRoute.QuickJoin]))
		}

		this.store.dispatch([
			new UserRequestedPasscode(false),
			new ViewerPasscodes(bookingPasscode, bookingPasscodeHash, bookingToken)
		])

		this.store.dispatch(new CheckAuthorised(session))

		return this.actions.pipe(
			ofActionCompleted(CheckAuthorisedResponse),
			map((completed) => completed.action),
			map((result: SocketResponse<ICheckAuthorised>) => ({
				code: result.code,
				sessionId: result.data?.sessionId,
				error: result.error || result.data?.reason
			})),
			switchMap(({code, error, sessionId}) => {
				if (code === 200 && !this.logged) {
					this.store.dispatch(new ViewerSkippedLogin(true))
				}

				if (code !== 200) {
					this.snackBar.open(error || '', '', SnackConfig)
				}

				if (code === 402) {
					return this.dialog
						.open(ViewerLoginPopupComponent)
						.afterClosed()
						.pipe(
							switchMap(() =>
								from(
									this.router.navigate([AppRoute.User], {
										queryParams: {
											...route.queryParams
										}
									})
								)
							)
						)
				}

				if (code === 401) {
					this.store.dispatch(new UserRequestedPasscode(true))
				}

				return code === 200
					? of(true).pipe(
							tap(() => this.store.dispatch(new GetSessionStatus(sessionId)))
					  )
					: from(this.router.navigate([AppRoute.QuickJoin]))
			})
		)
	}
}
