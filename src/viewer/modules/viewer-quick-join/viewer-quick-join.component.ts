import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AppRoute} from '@enum/AppRoute.enum'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {
	UserRequestedPasscode,
	ViewerSkippedLogin
} from '@shared/store/user/user.actions'
import {Select} from '@ngxs/store'
import {UserState} from '@shared/store/user/user.state'
import {Observable} from 'rxjs'
import {LeaveSession} from '@shared/store/session/session.actions'

@Component({
	templateUrl: './viewer-quick-join.component.html',
	styleUrls: ['../../../shared/components/styles/quick-join.scss']
})
export class ViewerQuickJoinComponent implements OnInit {
	@Select(UserState.requestedPasscode) needToEnterPasscode!: Observable<
		boolean | undefined
	>
	public session: AppRoute = AppRoute.User
	public quickJoinForm = new FormGroup({
		sessionId: new FormControl(null, [
			Validators.required,
			Validators.minLength(1)
		]),
		bookingPasscode: new FormControl()
	})

	@Dispatch()
	public clearPasscodeInput() {
		this.quickJoinForm.get('bookingPasscode')?.reset()
		return new UserRequestedPasscode(false)
	}

	@Dispatch()
	ngOnInit() {
		return [
			new LeaveSession(),
			new UserRequestedPasscode(false),
			new ViewerSkippedLogin(false)
		]
	}
}
