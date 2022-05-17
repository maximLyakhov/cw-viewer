import {Injectable} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {SessionState} from '@shared/store/session/session.state'
import {Feed, Send} from '@shared/store/websocket/websocket.send.actions'

@Injectable({providedIn: 'root'})
export class CaptionerRespeakingService {
	@SelectSnapshot(SessionState.sessionId) sessionId!: number

	@Dispatch()
	public activateCapturingAudio(engine: number, userSubLists: number[]) {
		return new Send({
			type: MessageType.TurnOnAudioDelivery,
			data: {
				sessionId: Number(this.sessionId),
				engineId: Number(engine),
				userSubLists
			}
		})
	}

	@Dispatch()
	public deactivateCapturingAudio() {
		return new Send({type: MessageType.TurnOffAudioDelivery})
	}

	@Dispatch()
	public sendBlob(event: BlobEvent) {
		return new Feed(event.data)
	}
}
