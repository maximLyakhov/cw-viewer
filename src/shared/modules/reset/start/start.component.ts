import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AppRoute} from '@enum/AppRoute.enum'
import {ResetDispatcher} from '@shared/modules/reset/reset.dispatcher'

@Component({
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.scss']
})
export class StartComponent {
	public disable: boolean = false
	public backToLogin = AppRoute.Login
	public resetForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email])
	})

	constructor(private dispatcher: ResetDispatcher) {}

	public startReset() {
		const email = this.resetForm.controls.email.value
		this.disable = true
		this.dispatcher.startResetPassword(email)
	}
}
