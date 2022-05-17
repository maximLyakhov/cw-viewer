import {Component} from '@angular/core'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {DisconnectWebSocket} from '@ngxs/websocket-plugin'

@Component({
	selector: 'app-root',
	templateUrl: './captioner.component.html'
})
export class CaptionerComponent {
	constructor() {
		// @ts-ignore
		window['app'] = this
	}

	@Dispatch()
	public dis() {
		return [new DisconnectWebSocket()]
	}
}
