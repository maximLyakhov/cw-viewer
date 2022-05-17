import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {environment} from '@env'
import {Credentials} from '@interface/message/credentials.interface'
import {Actions, ofActionSuccessful, Store} from '@ngxs/store'
import {Login} from '@shared/store/user/user.actions'
import {GetUserSettingsResponse} from '@shared/store/websocket/websocket.response.actions'
import {switchMap} from 'rxjs/operators'

@Component({
	selector: 'captioner-session-auth',
	templateUrl: './captioner-login.component.html',
	styleUrls: ['./captioner-login.component.scss']
})
export class CaptionerLoginComponent {
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
		private router: Router,
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
					this.actions.pipe(ofActionSuccessful(GetUserSettingsResponse))
				),
				switchMap(() => this.router.navigate([AppRoute.QuickJoin]))
			)
			.subscribe(() => (this.awaitingLogin = false))
	}
}
