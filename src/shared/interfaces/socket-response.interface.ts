import {HttpStatusCode} from '@angular/common/http'
import {ResponseType} from '@enum/ResponseType'

interface Response {
	p: number
	type: ResponseType
	code: HttpStatusCode
}

export interface ErrorResponse extends Response {
	error: string
}

interface ValidResponse<T> extends Response {
	data: T
}

export interface SocketResponse<T> extends ValidResponse<T>, ErrorResponse {}
