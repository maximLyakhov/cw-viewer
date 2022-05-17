import {Injectable} from '@angular/core'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {environment} from '@env'

interface ICheckPasswordRequest {
	passwordChangeToken: string
	email: string
}

interface IChangePasswordRequest {
	email: string
	changePasswordToken: string
	password: string
}

@Injectable({providedIn: 'root'})
export class ResetDispatcher {
	@Dispatch()
	public startResetPassword(email: string) {
		const data = {email, site: environment.role}
		return new Send({type: MessageType.StartResetPassword, data})
	}

	@Dispatch()
	public checkResetPassword(data: ICheckPasswordRequest) {
		return new Send({type: MessageType.CheckResetPassword, data})
	}

	@Dispatch()
	public changePassword(data: IChangePasswordRequest) {
		return new Send({type: MessageType.ChangePassword, data})
	}
}
