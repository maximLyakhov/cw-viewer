import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
import {FormControl} from '@angular/forms'
import {MessageType} from '@enum/MessageType'
import {environment} from '@env'
import {Caption} from '@interface/response/caption.interface'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store'
import {SessionState} from '@shared/store/session/session.state'
import {
	PrepareSessionTranscriptResp,
	SubscribeCaptioningResponse
} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'

@Component({
	selector: 'app-captioner-captions',
	templateUrl: './captioner-captions.component.html',
	styleUrls: ['../../../../shared/components/styles/captions.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionerCaptionsComponent implements OnInit, OnDestroy {
	@Select(SessionState.captions) public captions$!: Observable<Caption[][]>
	@Select(SessionState.loading) public loading$!: Observable<boolean>
	public scrollingEnabled = new FormControl(true)
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number
	@SelectSnapshot(SessionState.captionerPasscode)
	private captionerPasscode!: string

	constructor(private store: Store, private actions: Actions) {}

	public tracking(index: number, sentence: Caption[]) {
		return sentence.length
	}

	ngOnInit() {
		return this.store
			.dispatch(
				new Send({
					type: MessageType.SubscribeCaptioning,
					data: {
						sessionId: this.sessionId,
						captionerPasscode: this.captionerPasscode
					}
				})
			)
			.pipe(
				switchMap(() =>
					this.actions.pipe(ofActionSuccessful(SubscribeCaptioningResponse))
				),
				map((response) => response.data.lastChunkId)
			)
			.subscribe()
	}

	public saveTranscript() {
		return this.store
			.dispatch(
				new Send({
					type: MessageType.PrepareSessionTranscript,
					data: {
						sessionId: this.sessionId,
						captionerPasscode: this.captionerPasscode
					}
				})
			)
			.pipe(
				switchMap(() =>
					this.actions.pipe(ofActionSuccessful(PrepareSessionTranscriptResp))
				),
				map((response) => response.data.downloadUrl)
			)
			.subscribe((response) =>
				window.open(`${environment.transcript}${response}`, '_blank')
			)
	}

	public scrollToLast(el: HTMLDivElement): void {
		if (this.scrollingEnabled.value) {
			el.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'start'
			})
		}
	}

	@Dispatch()
	ngOnDestroy() {
		return new Send({
			type: MessageType.UnsubscribeCaptioning,
			data: {sessionId: this.sessionId}
		})
	}
}
