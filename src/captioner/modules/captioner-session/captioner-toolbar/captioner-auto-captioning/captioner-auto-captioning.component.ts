import {Component, OnDestroy} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {SelectSnapshot, ViewSelectSnapshot} from '@ngxs-labs/select-snapshot'
import {SessionState} from '@shared/store/session/session.state'
import {Send} from '@shared/store/websocket/websocket.send.actions'

@Component({
	selector: 'app-captioner-auto-captioning',
	templateUrl: './captioner-auto-captioning.component.html',
	styleUrls: ['../captioner-button.scss']
})
export class CaptionerAutoCaptioningComponent implements OnDestroy {
	public autoCaptioningOn: boolean = false
	@ViewSelectSnapshot(SessionState.autoCaptioning)
	public autoCaptioning!: boolean
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number

	@Dispatch()
	public startAutoCaptions() {
		return new Send({
			type: MessageType.StartAutoCaptioning,
			data: {sessionId: this.sessionId}
		})
	}

	@Dispatch()
	public stopAutoCaptions() {
		return new Send({
			type: MessageType.StopAutoCaptioning,
			data: {sessionId: this.sessionId}
		})
	}

	ngOnDestroy(): void {
		this.stopAutoCaptions()
	}
}
