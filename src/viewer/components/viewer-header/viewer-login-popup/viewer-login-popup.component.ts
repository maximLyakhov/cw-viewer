import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AppRoute} from '@enum/AppRoute.enum'
import {environment} from '@env'
import {Credentials} from '@interface/message/credentials.interface'
import {Actions, ofActionCompleted, Store} from '@ngxs/store'
import {DialogRef} from '@service/dialog.service'
import {Login} from '@shared/store/user/user.actions'
import {
	GetUserSettingsResponse,
	LogInResponse
} from '@shared/store/websocket/websocket.response.actions'
import {switchMap, tap} from 'rxjs/operators'

@Component({
	templateUrl: './viewer-login-popup.component.html',
	styleUrls: ['./viewer-login-popup.component.scss']
})
export class ViewerLoginPopupComponent {
	public resetRoute = AppRoute.ResetPassword
	public awaitingLogin = false
	public loginForm: FormGroup = new FormGroup({
		email: new FormControl(environment.email, [
			Validators.email,
			Validators.required
		]),
		password: new FormControl(environment.password, [
			Validators.required,
			Validators.minLength(3)
		]),
		role: new FormControl(environment.role, [Validators.required])
	})

	constructor(
		public dialogRef: DialogRef,
		private store: Store,
		private actions: Actions
	) {}

	public loginAndGo(): void {
		const credentials: Credentials = this.loginForm.value

		this.awaitingLogin = true

		this.store
			.dispatch(new Login(credentials))
			.pipe(
				switchMap(() =>
					this.actions.pipe(
						ofActionCompleted(LogInResponse, GetUserSettingsResponse)
					)
				),
				tap(() => (this.awaitingLogin = false)),
				tap(() => this.dialogRef.close())
			)
			.subscribe()
	}
}
