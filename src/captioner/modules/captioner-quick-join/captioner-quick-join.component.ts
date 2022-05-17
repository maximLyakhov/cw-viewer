import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AppRoute} from '@enum/AppRoute.enum'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {LeaveSession} from '@shared/store/session/session.actions'

@Component({
	selector: 'app-captioner-session-quick-join',
	templateUrl: './captioner-quick-join.component.html',
	styleUrls: ['../../../shared/components/styles/quick-join.scss']
})
export class CaptionerQuickJoinComponent implements OnInit {
	public session: AppRoute = AppRoute.User
	public quickJoinForm = new FormGroup({
		sessionId: new FormControl(null, [
			Validators.required,
			Validators.minLength(1)
		]),
		captionerPasscode: new FormControl(null, [
			Validators.required,
			Validators.minLength(1)
		])
	})

	@Dispatch()
	ngOnInit() {
		return new LeaveSession()
	}
}
