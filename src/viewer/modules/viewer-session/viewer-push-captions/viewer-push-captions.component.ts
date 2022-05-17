import {Component, ViewEncapsulation} from '@angular/core'
import {DialogService} from '@service/dialog.service'
import {PushCaptionsDialogComponent} from '@cmp/push-captions-dialog/push-captions-dialog.component'
import {SelectSnapshot, ViewSelectSnapshot} from '@ngxs-labs/select-snapshot'
import {SessionState} from '@shared/store/session/session.state'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {take} from 'rxjs/operators'

@Component({
	selector: 'app-viewer-push-captions',
	templateUrl: './viewer-push-captions.component.html',
	styleUrls: ['./viewer-push-captions.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ViewerPushCaptionsComponent {
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
