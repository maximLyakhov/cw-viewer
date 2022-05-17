import {Component, OnDestroy} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {Actions, ofActionSuccessful, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {TwilioDeviceService} from '@service/twilio-device.service'
import {SpeakerAudioSendResponse} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {ViewerAudioInputDialogComponent} from '@modules/viewer-session/viewer-share-audio/viewer-audio-input-dialog/viewer-audio-input-dialog.component'
import {map, switchMap, tap} from 'rxjs/operators'

@Component({
	selector: 'app-viewer-share-audio',
	templateUrl: './viewer-share-audio.component.html',
	styleUrls: ['./viewer-share-audio.component.scss']
})
export class ViewerShareAudioComponent implements OnDestroy {
	public feedsAudio: boolean = false
	private sessionId = this.store.selectSnapshot(
		(state) => state.session.sessionId
	)
	private rememberedInput: MediaDeviceInfo | undefined

	constructor(
		private twilio: TwilioDeviceService,
		private actions: Actions,
		private store: Store,
		private dialog: DialogService
	) {}

	public shareAudio() {
		if (this.rememberedInput) {
			this.twilio.connect()
			this.feedsAudio = true
		} else {
			this.store
				.dispatch(
					new Send({
						type: MessageType.SpeakerSendAudio,
						data: {sessionId: Number(this.sessionId)}
					})
				)
				.pipe(
					switchMap(() =>
						this.actions.pipe(ofActionSuccessful(SpeakerAudioSendResponse))
					),
					map((response) => response.data.twillio_jwt),
					tap((response) => this.twilio.createDevice(response)),
					switchMap(() =>
						this.dialog.open(ViewerAudioInputDialogComponent).afterClosed()
					)
				)
				.subscribe((result: {input: MediaDeviceInfo}) => {
					if (result && result.input) {
						this.feedsAudio = true
						this.rememberedInput = result.input
						this.twilio.setInputDevice(result.input)
						this.twilio.connect()
					}
				})
		}
	}

	public stopAudio(): void {
		this.feedsAudio = false
		this.twilio.disconnectAll().then()
	}

	ngOnDestroy(): void {
		this.feedsAudio = false
		this.twilio.disconnectAll().then()
		this.twilio.destroy()
	}
}
