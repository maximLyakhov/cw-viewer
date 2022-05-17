import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {LogoutDialogComponent} from '@cmp/logout-dialog/logout-dialog.component'
import {AppRoute} from '@enum/AppRoute.enum'
import {UserSettings} from '@interface/response/user-settings.interface'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {LeaveSession} from '@shared/store/session/session.actions'
import {SessionState} from '@shared/store/session/session.state'
import {Logout, Relogin} from '@shared/store/user/user.actions'
import {UserState} from '@shared/store/user/user.state'
import {LogOutResponse} from '@shared/store/websocket/websocket.response.actions'
import {EMPTY, from, Observable} from 'rxjs'
import {switchMap, take} from 'rxjs/operators'
import {CaptionerSettingsComponent} from '@captioner/components/captioner-header/captioner-settings/captioner-settings.component'

@Component({
	selector: 'app-captioner-header',
	templateUrl: './captioner-header.component.html',
	styleUrls: ['../../../shared/components/styles/header.scss']
})
export class CaptionerHeaderComponent implements OnInit {
	@Select(UserState.userInfo) public userInfo$!: Observable<
		UserSettings | undefined
	>
	@Select(SessionState.sessionInfo) public sessionInfo$!: Observable<
		number | undefined
	>
	public appRoute = AppRoute

	constructor(
		private router: Router,
		private dialog: DialogService,
		private store: Store,
		private actions: Actions
	) {}

	@Dispatch()
	ngOnInit() {
		return new Relogin()
	}

	public confirmLogout() {
		this.dialog
			.open(LogoutDialogComponent)
			.afterClosed()
			.pipe(
				take(1),
				switchMap((result: boolean) =>
					result
						? this.store.dispatch([new Logout()]).pipe(
								switchMap(() =>
									this.actions.pipe(ofActionSuccessful(LogOutResponse))
								),
								switchMap(() => from(this.router.navigate([AppRoute.Login]))),
								switchMap(() => this.store.dispatch(new LeaveSession()))
						  )
						: EMPTY
				)
			)
			.subscribe()
	}

	public leaveSession() {
		return this.router.navigate([AppRoute.QuickJoin]).then()
	}

	public openSettings() {
		this.dialog.open(CaptionerSettingsComponent)
	}
}
