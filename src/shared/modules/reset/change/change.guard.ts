import {Injectable} from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {from, Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {ActionCompletion, Actions, ofActionCompleted} from '@ngxs/store'
import {CheckResetPasswordResponse} from '@shared/store/websocket/websocket.response.actions'
import {SocketResponse} from '@interface/socket-response.interface'
import {ResetDispatcher} from '@shared/modules/reset/reset.dispatcher'

@Injectable({providedIn: 'root'})
export class ChangeGuard implements CanActivate {
	constructor(
		private dispatcher: ResetDispatcher,
		private actions: Actions,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		_: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean | UrlTree {
		const {passwordChangeToken, email} = route.queryParams

		if (passwordChangeToken && email) {
			this.dispatcher.checkResetPassword({passwordChangeToken, email})

			const response$: Observable<ActionCompletion<SocketResponse<null>>> =
				this.actions.pipe(ofActionCompleted(CheckResetPasswordResponse))

			return response$.pipe(
				switchMap((completed) =>
					completed.action.code === 200
						? of(true)
						: from(this.router.navigate([AppRoute.Login]))
				)
			)
		}

		return from(this.router.navigate([AppRoute.Login]))
	}
}
