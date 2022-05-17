import {Injectable} from '@angular/core'
import {MacroArray} from '@captioner/modules/captioner-session/captioner-captions/captioner-macro-bar/captioner-macro-bar.interfaces'
import {Action, Selector, State, StateContext} from '@ngxs/store'
import {
	AddDraftSubList,
	ClearMacros,
	UpdateMacros
} from '@shared/store/captioner/captioner.actions'
import {SubList, UglySubList} from '@interface/sublist.interface'
import {
	CreateSubListResponse,
	DeleteSubListResponse,
	GetSubListSummaryResponse,
	UpdateSubListResponse
} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'

interface CaptionerStateModel {
	captionerPasscode?: string
	macros: MacroArray
	subLists?: SubList[]
}

@State<CaptionerStateModel>({name: 'captioner'})
@Injectable()
export class CaptionerState {
	@Selector()
	public static macros(state: CaptionerStateModel) {
		return state.macros
	}

	@Selector()
	public static passcode(state: CaptionerStateModel) {
		return state.captionerPasscode
	}

	@Selector()
	public static subLists(state: CaptionerStateModel): UglySubList[] {
		return (
			state.subLists?.map((parent) => ({
				...parent,
				subList: parent.subList.join('\n')
			})) || []
		)
	}

	@Action(AddDraftSubList)
	private addDraftSubList({
		patchState,
		getState
	}: StateContext<CaptionerStateModel>) {
		const currentSubListsState = getState().subLists || []
		return patchState({
			subLists: [
				...currentSubListsState,
				{
					name: 'New SubList',
					notes: 'Description',
					subList: ['']
				} as SubList
			]
		})
	}

	@Action(GetSubListSummaryResponse)
	private getSubListSummaryResponse(
		{patchState}: StateContext<CaptionerStateModel>,
		{data}: GetSubListSummaryResponse
	) {
		return patchState({subLists: data.subLists})
	}

	@Action(CreateSubListResponse)
	private createSubListResponse(
		{dispatch}: StateContext<CaptionerStateModel>,
		{data}: CreateSubListResponse
	) {
		if (data.SubListId) {
			dispatch(new Send({type: MessageType.GetSubListSummary}))
		}
	}

	@Action(UpdateSubListResponse)
	private updateSubListResponse({dispatch}: StateContext<CaptionerStateModel>) {
		dispatch(new Send({type: MessageType.GetSubListSummary}))
	}

	@Action(DeleteSubListResponse)
	private deleteSubListResponse({dispatch}: StateContext<CaptionerStateModel>) {
		dispatch(new Send({type: MessageType.GetSubListSummary}))
	}

	@Action(UpdateMacros)
	private updateMacros(
		{getState, setState}: StateContext<CaptionerStateModel>,
		{payload}: UpdateMacros
	) {
		return setState({...getState(), macros: payload})
	}

	@Action(ClearMacros)
	private clearMacros({getState, setState}: StateContext<CaptionerStateModel>) {
		return setState({...getState(), macros: []})
	}
}
