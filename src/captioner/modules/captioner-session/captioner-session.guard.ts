import {Injectable} from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import {CaptionerPasscodeDialogComponent} from '@captioner/modules/captioner-session/captioner-passcode-dialog/captioner-passcode-dialog.component'
import {AppRoute} from '@enum/AppRoute.enum'
import {Actions, ofActionCompleted, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {
	CaptionerPasscode,
	CheckAuthorisedCaptioner,
	GetSessionStatusCaptioner,
	LeaveSession
} from '@shared/store/session/session.actions'
import {CheckAuthorisedResponse} from '@shared/store/websocket/websocket.response.actions'
import {from, Observable, of} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'
import {QueryParamsCaptioner} from '@interface/query-params.interface'

@Injectable({providedIn: 'root'})
export class CaptionerSessionGuard implements CanActivate {
	constructor(
		private router: Router,
		private dialog: DialogService,
		private actions: Actions,
		private store: Store
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		_: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean | UrlTree {
		const {sessionId, captionerPasscode} =
			route.queryParams as QueryParamsCaptioner
		if (!sessionId) return from(this.router.navigate([AppRoute.QuickJoin]))
		const session = Number(sessionId)

		if (!captionerPasscode) {
			return this.dialog
				.open(CaptionerPasscodeDialogComponent)
				.afterClosed()
				.pipe(
					switchMap((result) =>
						result
							? from(
									this.router.navigate([AppRoute.User], {
										queryParams: {
											captionerPasscode: result,
											sessionId: session
										} as QueryParamsCaptioner
									})
							  )
							: from(this.router.navigate([AppRoute.QuickJoin]))
					)
				)
		}

		this.store.dispatch([
			new CaptionerPasscode(captionerPasscode),
			new CheckAuthorisedCaptioner(session)
		])

		return this.actions.pipe(ofActionCompleted(CheckAuthorisedResponse)).pipe(
			switchMap(({action}) => {
				if (action.code === 200) {
					return of(true).pipe(
						tap(() =>
							this.store.dispatch(
								new GetSessionStatusCaptioner(session, captionerPasscode)
							)
						)
					)
				} else {
					this.store.dispatch(new LeaveSession())
					return from(this.router.navigate([AppRoute.QuickJoin]))
				}
			})
		)
	}
}
