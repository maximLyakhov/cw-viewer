import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {Engine} from '@enum/Engine.enum'
import {AudioService} from '@service/audio.service'
import {DialogService} from '@service/dialog.service'
import {Subscription} from 'rxjs'
import {filter, switchMap, take, tap} from 'rxjs/operators'
import {CaptionerRespeakingDialogComponent} from './captioner-respeaking-dialog/captioner-respeaking-dialog.component'
import {CaptionerRespeakingService} from './captioner-respeaking.service'
import {Actions, ofActionDispatched} from '@ngxs/store'
import {WebSocketDisconnected} from '@ngxs/websocket-plugin'

type RespeakingDialogResult = {
	engine: Engine
	input: MediaDeviceInfo
	save: boolean
	userSubLists: number[]
}

@Component({
	selector: 'app-captioner-respeaking',
	templateUrl: './captioner-respeaking.component.html',
	styleUrls: ['../captioner-button.scss']
})
export class CaptionerRespeakingComponent implements OnInit, OnDestroy {
	@Input() public autoCaptioningOn: boolean = false
	@Input() public sessionId: number | undefined
	public respeaking: boolean = false
	private chosenAudioInput: string = ''
	private recorder: MediaRecorder | undefined
	private stream: MediaStream | undefined
	private capturingAudio$: Subscription | undefined

	constructor(
		private audio: AudioService,
		private service: CaptionerRespeakingService,
		private dialog: DialogService,
		private actions: Actions
	) {}

	public activateRespeaking(): void {
		this.capturingAudio$ = this.dialog
			.open(CaptionerRespeakingDialogComponent)
			.afterClosed()
			.pipe(
				take(1),
				filter((result): result is RespeakingDialogResult => Boolean(result)),
				tap((result) => (this.chosenAudioInput = result.input.deviceId)),
				tap((result) =>
					this.service.activateCapturingAudio(
						result.engine,
						result.userSubLists
					)
				),
				switchMap(() => this.audio.mediaRecorder(this.chosenAudioInput))
			)
			.subscribe((media) => {
				this.stream = media.stream
				this.recorder = media.recorder
				this.recorder.ondataavailable = (event: BlobEvent) =>
					this.service.sendBlob(event)
				this.recorder.start(500)
				this.respeaking = true
			})
	}

	public deactivateRespeaking(): void {
		if (!this.respeaking) return

		this.service.deactivateCapturingAudio()
		this.capturingAudio$?.unsubscribe()

		if (this.stream) {
			this.audio.stopStream(this.stream)
		}
		if (this.recorder) {
			this.recorder.ondataavailable = null
			this.recorder.stop()
		}
		this.respeaking = false
	}

	ngOnInit() {
		this.actions
			.pipe(ofActionDispatched(WebSocketDisconnected))
			.subscribe(() => this.deactivateRespeaking())
	}

	ngOnDestroy() {
		this.deactivateRespeaking()
	}
}
