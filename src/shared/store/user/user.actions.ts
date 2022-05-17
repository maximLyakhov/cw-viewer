import {Credentials} from '@interface/message/credentials.interface'

export class Login {
	static readonly type = '[User] Login'

	constructor(public payload: Credentials) {}
}

export class Logout {
	static readonly type = '[User] Logout'

	constructor() {}
}

export class Relogin {
	static readonly type = '[User] Relogin'

	constructor() {}
}

export class GetUserSettings {
	static readonly type = '[User] Get Settings'

	constructor() {}
}

export class ViewerSkippedLogin {
	static readonly type = '[User] Viewer Anonymous'

	constructor(public anonymous: boolean) {}
}

export class UserRequestedPasscode {
	static readonly type = '[User] Viewer to Enter Passcode'

	constructor(public requestedPasscode: boolean) {}
}
