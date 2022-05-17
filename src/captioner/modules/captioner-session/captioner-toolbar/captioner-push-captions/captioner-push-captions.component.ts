import {Component} from '@angular/core'
import {SessionState} from '@shared/store/session/session.state'
import {take} from 'rxjs/operators'
import {DialogService} from '@service/dialog.service'
import {PushCaptionsDialogComponent} from '@cmp/push-captions-dialog/push-captions-dialog.component'
import {SelectSnapshot, ViewSelectSnapshot} from '@ngxs-labs/select-snapshot'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {MessageType} from '@enum/MessageType'
import {Send} from '@shared/store/websocket/websocket.send.actions'

@Component({
	selector: 'app-captioner-push-captions',
	templateUrl: './captioner-push-captions.component.html',
	styleUrls: ['../captioner-button.scss']
})
export class CaptionerPushCaptionsComponent {
	@ViewSelectSnapshot(SessionState.pushingCaptions)
	public pushingCaptions!: boolean
	@SelectSnapshot(SessionState.sessionId)
	private sessionId!: number

	constructor(private dialog: DialogService) {}

	public openDialog() {
		this.dialog
			.open(PushCaptionsDialogComponent)
			.afterClosed()
			.pipe(take(1))
			.subscribe()
	}

	@Dispatch()
	public stopPushing() {
		return new Send({
			type: MessageType.StopCaptionPush,
			data: {sessionId: this.sessionId}
		})
	}
}
