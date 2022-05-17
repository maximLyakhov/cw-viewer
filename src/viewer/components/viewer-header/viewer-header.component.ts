import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {LogoutDialogComponent} from '@cmp/logout-dialog/logout-dialog.component'
import {AppRoute} from '@enum/AppRoute.enum'
import {UserSettings} from '@interface/response/user-settings.interface'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {SessionState} from '@shared/store/session/session.state'
import {
	Logout,
	Relogin,
	ViewerSkippedLogin
} from '@shared/store/user/user.actions'
import {UserState} from '@shared/store/user/user.state'
import {LogOutResponse} from '@shared/store/websocket/websocket.response.actions'
import {ViewerLoginPopupComponent} from '@cmp/viewer-login-popup/viewer-login-popup.component'
import {EMPTY, from, Observable} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {IStatus} from '@interface/response/status.interface'

@Component({
	selector: 'app-viewer-header',
	templateUrl: './viewer-header.component.html',
	styleUrls: ['../../../shared/components/styles/header.scss']
})
export class ViewerHeaderComponent implements OnInit {
	@Select(UserState.userInfo) public userInfo$!: Observable<
		UserSettings | undefined
	>
	@Select(UserState.logged) public logged$!: Observable<boolean>
	@Select(UserState.anonymous) public anonymous!: Observable<boolean>
	@Select(SessionState.sessionInfo) public sessionInfo$!: Observable<
		number | undefined
	>
	@Select(SessionState.status) public status$!: Observable<IStatus>
	public register = AppRoute.Register
	public quickJoin = AppRoute.QuickJoin

	constructor(
		private store: Store,
		private router: Router,
		private dialog: DialogService,
		private actions: Actions
	) {}

	@Dispatch()
	ngOnInit() {
		return new Relogin()
	}

	public login() {
		this.dialog.open(ViewerLoginPopupComponent)
	}

	public confirmLogout() {
		this.dialog
			.open(LogoutDialogComponent)
			.afterClosed()
			.pipe(
				switchMap((result: boolean) =>
					result
						? this.store.dispatch(new Logout()).pipe(
								switchMap(() =>
									this.actions.pipe(ofActionSuccessful(LogOutResponse))
								),
								switchMap(() =>
									from(this.router.navigate([AppRoute.QuickJoin]))
								)
						  )
						: EMPTY
				)
			)
			.subscribe()
	}

	@Dispatch()
	public leaveSession() {
		this.router.navigate([AppRoute.QuickJoin]).then()
		return [new ViewerSkippedLogin(false)]
	}
}
