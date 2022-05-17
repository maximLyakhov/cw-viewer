import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ReconnectSnackbarComponent} from '@cmp/reconnect-snackbar/reconnect-snackbar.component'
import {Action, NgxsOnInit, State, StateContext} from '@ngxs/store'
import {
	ConnectWebSocket,
	SendWebSocketMessage,
	WebSocketConnected,
	WebSocketDisconnected,
	WebsocketMessageError
} from '@ngxs/websocket-plugin'
import {Feed, Send} from '@shared/store/websocket/websocket.send.actions'
import {of} from 'rxjs'
import {delay, take, tap} from 'rxjs/operators'
import {MessageType} from '@enum/MessageType'

interface WebSocketStateModel {
	packetId: number
	subscriptions: {data: any; type: MessageType}[]
}

const defaults: WebSocketStateModel = {
	packetId: 1,
	subscriptions: []
}

@State<WebSocketStateModel>({name: 'websocket', defaults})
@Injectable()
export class WebsocketState implements NgxsOnInit {
	private retryCount: number = 0
	private retryDelays: number[] = [2, 4, 8, 16, 32, 64]

	constructor(private snackBar: MatSnackBar) {}

	ngxsOnInit({patchState}: StateContext<WebSocketStateModel>) {
		patchState({subscriptions: []})
	}

	/** @desc reconnection */
	@Action(WebSocketDisconnected)
	private webSocketDisconnected({dispatch}: StateContext<WebSocketStateModel>) {
		return of('anything').pipe(
			take(1),
			tap(() =>
				this.snackBar.openFromComponent(ReconnectSnackbarComponent, {
					data: {
						message: `You are disconnected. Retrying in ${
							this.retryDelays[this.retryCount]
						} seconds`,
						delay: this.retryDelays[this.retryCount]
					},
					verticalPosition: 'bottom',
					horizontalPosition: 'end',
					panelClass: 'snack'
				})
			),
			delay(this.retryDelays[this.retryCount] * 1000 || 0),
			tap(() => {
				this.retryDelays[this.retryCount] !== undefined
					? dispatch(new ConnectWebSocket())
					: window.location.reload()
				this.retryCount += 1
			})
		)
	}

	/** @desc send formatted message */
	@Action(Send)
	private send(
		{getState, patchState, dispatch}: StateContext<WebSocketStateModel>,
		{payload}: Send
	) {
		if (
			payload.type === MessageType.LogIn ||
			payload.type === MessageType.ReLogIn ||
			payload.type === MessageType.SubscribeChat ||
			payload.type === MessageType.SubscribeCaptioning
		) {
			const {data, type} = payload
			patchState({subscriptions: [...getState().subscriptions, {data, type}]})
		}

		dispatch(new SendWebSocketMessage({p: getState().packetId, ...payload}))
		return patchState({packetId: getState().packetId + 1})
	}

	/** @desc send binary */
	@Action(Feed)
	private feed({dispatch}: StateContext<WebSocketStateModel>, {payload}: Feed) {
		return dispatch(new SendWebSocketMessage(payload))
	}

	@Action(WebSocketConnected)
	private webSocketConnected({
		getState,
		dispatch,
		patchState
	}: StateContext<WebSocketStateModel>) {
		if (this.retryCount > 0) {
			getState().subscriptions.forEach((sub) => {
				dispatch(new Send(sub))
			})
			patchState({subscriptions: []})
			this.snackBar.open('Connection resumed', '', {
				duration: 1000,
				verticalPosition: 'bottom',
				horizontalPosition: 'end',
				panelClass: 'snack'
			})
		}
	}

	@Action(WebsocketMessageError)
	private websocketMessageError() {
		console.log('websocket message error')
	}
}
