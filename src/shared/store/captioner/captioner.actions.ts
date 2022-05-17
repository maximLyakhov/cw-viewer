import {MacroArray} from '@captioner/modules/captioner-session/captioner-captions/captioner-macro-bar/captioner-macro-bar.interfaces'
import {Caption} from '@interface/response/caption.interface'

export class UpdateMacros {
	static readonly type = '[Captioner] Update Macros'

	constructor(public payload: MacroArray) {}
}

export class ClearMacros {
	static readonly type = '[Captioner] Clear Macros'

	constructor() {}
}

export class StartEditCaption {
	static readonly type = '[Captioner] Start Edit Caption'

	constructor(public chunkId: Caption['chunkId']) {}
}

export class UpdateCaption {
	static readonly type = '[Captioner] Update Caption'

	constructor(public caption: Partial<Caption>) {}
}

export class AddDraftSubList {
	static readonly type = '[Captioner] Add Draft Sublist'

	constructor() {}
}
