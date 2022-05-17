import {MessageType} from '@enum/MessageType'

export interface SocketMessage<T> {
	p: number
	type: MessageType
	data?: T
}
