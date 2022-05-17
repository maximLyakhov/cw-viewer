import {Component, OnDestroy} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {Actions, ofActionSuccessful, Store} from '@ngxs/store'
import {AudioService} from '@service/audio.service'
import {DialogService} from '@service/dialog.service'
import {TwilioDeviceService} from '@service/twilio-device.service'
import {SessionState} from '@shared/store/session/session.state'
import {UserState} from '@shared/store/user/user.state'
import {SpeakerAudioReceiveResponse} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {of} from 'rxjs'
import {switchMap, take} from 'rxjs/operators'

@Component({
	selector: 'app-captioner-speaker-audio',
	templateUrl: './captioner-speaker-audio.component.html',
	styleUrls: ['../captioner-button.scss']
})
export class CaptionerSpeakerAudioComponent implements OnDestroy {
	public responds: boolean = false
	public disabled: boolean = false
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number
	@SelectSnapshot(UserState.token) private token!: string
	private twilioToken: string | undefined

	constructor(
		private twilio: TwilioDeviceService,
		private dialog: DialogService,
		private audio: AudioService,
		private actions: Actions,
		private store: Store
	) {}

	public async share() {
		if (this.responds) return
		if (navigator.mediaDevices) {
			await navigator.mediaDevices
				.getUserMedia({audio: true, video: false})
				.then((stream) =>
					stream.getAudioTracks().forEach((track) => track.stop())
				)

			of(this.twilioToken)
				.pipe(
					switchMap(() =>
						this.twilioToken
							? of({data: this.twilioToken})
							: this.store
									.dispatch(
										new Send({
											type: MessageType.SpeakerAudioReceive,
											data: {sessionId: this.sessionId, token: this.token}
										})
									)
									.pipe(
										switchMap(() =>
											this.actions.pipe(
												ofActionSuccessful(SpeakerAudioReceiveResponse)
											)
										)
									)
					),
					switchMap((response: {data: {twillio_jwt: string}}) => {
						this.twilio.createDevice(response.data.twillio_jwt)
						this.twilioToken = response.data.twillio_jwt
						this.responds = true
						return this.twilio.captionerConnect()
					}),
					take(1)
				)
				.subscribe((res) => {
					res ? (this.responds = true) : (this.responds = false)
				})
		} else {
			this.disabled = true
		}
	}

	public stop() {
		if (!this.responds) return
		this.responds = false
		this.twilio.disconnectAll().then()
	}

	ngOnDestroy() {
		this.stop()
	}
}
