import {Component, OnDestroy, OnInit} from '@angular/core'
import {ISessionStatus} from '@interface/response/session-status.interface'
import {Select} from '@ngxs/store'
import {SessionState} from '@shared/store/session/session.state'
import {Observable} from 'rxjs'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'

@Component({
	templateUrl: './captioner-session.component.html',
	styleUrls: ['./captioner-session.component.scss']
})
export class CaptionerSessionComponent implements OnInit, OnDestroy {
	@SelectSnapshot(SessionState.sessionId) public sessionId!: number | undefined
	@Select(SessionState.sessionInfo) public sessionInfo$!: Observable<
		ISessionStatus | undefined
	>
	@SelectSnapshot(SessionState.captionerPasscode) private captionerPasscode:
		| string
		| undefined

	@Dispatch()
	ngOnInit() {
		return new Send({
			type: MessageType.StartCaptioning,
			data: {
				sessionId: Number(this.sessionId),
				captionerPasscode: this.captionerPasscode
			}
		})
	}

	@Dispatch()
	ngOnDestroy() {
		return new Send({type: MessageType.StopCaptioning})
	}
}
