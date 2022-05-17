import {Component, ViewEncapsulation} from '@angular/core'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {SessionState} from '@shared/store/session/session.state'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {DialogRef} from '@service/dialog.service'
import {IPushCaptions} from '@interface/message/push-captions.interface'

@Component({
	selector: 'app-captioner-viewer-push-captions-dialog',
	templateUrl: './push-captions-dialog.component.html',
	styleUrls: ['./push-captions-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PushCaptionsDialogComponent {
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number
	public pushCaptionsForm = new FormGroup({
		sessionId: new FormControl(this.sessionId, [Validators.required]),
		url: new FormControl(null, [Validators.required]),
		lineLength: new FormControl(32, [Validators.required]),
		lineCount: new FormControl(2, [Validators.required]),
		lineByLine: new FormControl(false)
	})

	constructor(public dialogRef: DialogRef) {}

	@Dispatch()
	public pushCaptions() {
		this.dialogRef.close()
		return new Send({
			type: MessageType.StartCaptionPush,
			data: this.prepareData()
		})
	}

	private prepareData() {
		const {sessionId, lineCount, lineLength, lineByLine, url} = this
			.pushCaptionsForm.value as IPushCaptions

		return {
			sessionId,
			lineCount: Number(lineCount),
			lineLength: Number(lineLength),
			lineByLine: Number(lineByLine),
			url
		}
	}
}
