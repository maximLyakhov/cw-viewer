import {Component} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Select, Store} from '@ngxs/store'
import {DialogService} from '@service/dialog.service'
import {UpdateMacros} from '@shared/store/captioner/captioner.actions'
import {CaptionerState} from '@shared/store/captioner/captioner.state'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable} from 'rxjs'
import {filter, switchMap, take} from 'rxjs/operators'
import {MacroArray} from './captioner-macro-bar.interfaces'
import {CaptionerMacroDialogComponent} from './captioner-macro-dialog/captioner-macro-dialog.component'
import {SessionState} from '@shared/store/session/session.state'
import {ViewSelectSnapshot} from '@ngxs-labs/select-snapshot'

@Component({
	selector: 'app-captioner-macro-bar',
	templateUrl: './captioner-macro-bar.component.html',
	styleUrls: ['./captioner-macro-bar.component.scss']
})
export class CaptionerMacroBarComponent {
	@ViewSelectSnapshot(SessionState.autoCaptioning)
	public autoCaptioning!: boolean
	@Select(CaptionerState.macros) public macros$!: Observable<MacroArray>

	constructor(private dialog: DialogService, private store: Store) {}

	public openMacroDialog() {
		// try to action
		this.dialog
			.open(CaptionerMacroDialogComponent)
			.afterClosed()
			.pipe(
				take(1),
				filter((x) => x),
				switchMap((macros: MacroArray) =>
					this.store.dispatch(new UpdateMacros(macros))
				)
			)
			.subscribe()
	}

	@Dispatch()
	public sendChunk(txt: string) {
		if (!txt) return
		return new Send({type: MessageType.SendChunk, data: {txt, final: 1}})
	}
}
