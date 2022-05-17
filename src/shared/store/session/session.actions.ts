export class GetSessionStatus {
	static readonly type = '[Session] Get Status'

	constructor(public sessionId: number) {}
}

export class GetSessionStatusCaptioner {
	static readonly type = '[Session] Get Status Captioner'

	constructor(public sessionId: number, public captionerPasscode: string) {}
}

export class ViewerPasscodes {
	static readonly type = '[Session] Store Viewer Passcodes'

	constructor(
		public bookingPasscode: string,
		public bookingPasscodeHash: string,
		public bookingToken?: string
	) {}
}

export class CaptionerPasscode {
	static readonly type = '[Session] Store Captioner Passcode'

	constructor(public captionerPasscode: string) {}
}

export class LeaveSession {
	static readonly type = '[Session] Leave Session'

	constructor() {}
}

export class CheckAuthorised {
	static readonly type = '[Session] Check Authorised'

	constructor(public sessionId: number) {}
}

export class CheckAuthorisedCaptioner {
	static readonly type = '[Session] Check Authorised Captioner'

	constructor(public sessionId: number) {}
}

export class ReadMessage {
	static readonly type = '[Session] Read Chat Message'

	constructor(public ChatId: number) {}
}
