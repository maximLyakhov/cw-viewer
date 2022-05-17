import {Injectable} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'

@Injectable({providedIn: 'root'})
export class CaptionerAutoCaptioningService {
	@Dispatch()
	public startAutoCaptioning(session: number) {
		return new Send({
			type: MessageType.StartAutoCaptioning,
			data: {sessionId: Number(session)}
		})
	}
}
