import {MessageType} from '@enum/MessageType'

export class Send {
	static readonly type = '[WebSocket] Send'

	constructor(public payload: {type: MessageType; data?: any}) {}
}

export class Feed {
	static readonly type = '[Websocket] Blob'

	constructor(public payload: Blob) {}
}
