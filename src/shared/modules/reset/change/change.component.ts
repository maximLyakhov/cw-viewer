import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {ResetDispatcher} from '@shared/modules/reset/reset.dispatcher'

@Component({
	selector: 'captioner-session-change',
	templateUrl: './change.component.html'
})
export class ChangeComponent {
	public changeForm = new FormGroup({
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(6)
		]),
		confirm: new FormControl('', [Validators.required, Validators.minLength(6)])
	})

	constructor(
		private route: ActivatedRoute,
		private dispatcher: ResetDispatcher
	) {}

	public changePassword() {
		const {passwordChangeToken, email} = this.route.snapshot.queryParams

		this.dispatcher.changePassword({
			email,
			password: this.changeForm.value.password,
			changePasswordToken: passwordChangeToken
		})
	}
}
