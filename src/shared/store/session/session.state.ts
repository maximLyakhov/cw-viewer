import {Injectable} from '@angular/core'
import {MessageType} from '@enum/MessageType'
import {ChatEntry, ChatUser} from '@interface/chat.interfaces'
import {Caption} from '@interface/response/caption.interface'
import {ISessionStatus} from '@interface/response/session-status.interface'
import {IStatus} from '@interface/response/status.interface'
import {
	Action,
	Actions,
	NgxsOnInit,
	ofActionSuccessful,
	Selector,
	State,
	StateContext,
	Store
} from '@ngxs/store'
import {
	StartEditCaption,
	UpdateCaption
} from '@shared/store/captioner/captioner.actions'
import {
	CaptionerPasscode,
	CheckAuthorised,
	CheckAuthorisedCaptioner,
	GetSessionStatus,
	GetSessionStatusCaptioner,
	LeaveSession,
	ReadMessage,
	ViewerPasscodes
} from '@shared/store/session/session.actions'
import {
	CaptionResponse,
	Chat,
	CheckAuthorisedResponse,
	GetCaptionChunksResponse,
	GetChatsResponse,
	GetSessionStatusResponse,
	SpeakerAudioSendResponse,
	StartCaptionPushResp,
	Status,
	StopCaptionPushResp,
	SubscribeCaptioningResponse
} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable} from 'rxjs'
import {map, switchMap, tap} from 'rxjs/operators'
import {UserState} from '@shared/store/user/user.state'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SnackConfig} from '@shared/configs/snack.config'

export interface SessionStateModel {
	sessionId?: number
	sessionInfo?: ISessionStatus
	bookingPasscode?: string
	bookingPasscodeHash?: string
	bookingToken?: string
	captionerPasscode?: string

	lastChunkId?: number
	captions: Partial<Caption>[][]
	sentenceCounter: number
	loading?: boolean

	twillioJwt?: string

	chats?: Partial<ChatEntry>[]
	users?: ChatUser[]

	status?: IStatus
	pushingCaptions?: boolean
}

@State<SessionStateModel>({
	name: 'session',
	defaults: {sentenceCounter: 0, captions: []}
})
@Injectable()
export class SessionState implements NgxsOnInit {
	constructor(
		private actions: Actions,
		private store: Store,
		private snack: MatSnackBar
	) {}

	@Selector()
	public static sessionInfo(
		state: SessionStateModel
	): ISessionStatus | undefined {
		return state.sessionInfo
	}

	@Selector()
	public static sessionId(state: SessionStateModel): number | undefined {
		return state.sessionId
	}

	@Selector()
	public static captionerPasscode(
		state: SessionStateModel
	): string | undefined {
		return state.captionerPasscode
	}

	@Selector()
	public static bookingPasscode(state: SessionStateModel): string | undefined {
		return state.bookingPasscode
	}

	@Selector()
	public static bookingPasscodeHash(
		state: SessionStateModel
	): string | undefined {
		return state.bookingPasscodeHash
	}

	@Selector()
	public static twilioJwt(state: SessionStateModel): string | undefined {
		return state.twillioJwt
	}

	@Selector()
	public static loading(state: SessionStateModel): boolean | undefined {
		return state.loading
	}

	@Selector()
	public static status(state: SessionStateModel): IStatus | undefined {
		return state.status
	}

	@Selector()
	public static autoCaptioning(state: SessionStateModel): boolean {
		return Boolean(state.status?.autoCaptioning?.available)
	}

	@Selector()
	public static captions(state: SessionStateModel): Partial<Caption>[][] {
		return state.captions || []
	}

	@Selector()
	public static users(state: SessionStateModel): ChatUser[] | undefined {
		return state.users
	}

	@Selector()
	public static chats(state: SessionStateModel): Partial<ChatEntry>[] {
		return state.chats || []
	}

	@Selector()
	public static unreadMessages(state: SessionStateModel): number {
		return (state.chats || []).filter((c) => c.Unread).length
	}

	@Selector()
	public static pushingCaptions(state: SessionStateModel): boolean {
		return Boolean(state.pushingCaptions)
	}

	ngxsOnInit({dispatch}: StateContext<SessionStateModel>) {
		dispatch(new LeaveSession())
	}

	@Action(GetSessionStatus)
	private getSessionStatus(
		{dispatch, getState, setState}: StateContext<SessionStateModel>,
		{sessionId}: GetSessionStatus
	): Observable<ISessionStatus> {
		setState({...getState(), sessionId: sessionId})

		return dispatch(
			new Send({type: MessageType.GetSessionStatus, data: {sessionId}})
		).pipe(
			switchMap(() =>
				this.actions.pipe(ofActionSuccessful(GetSessionStatusResponse))
			),
			map((response) => response.data)
		)
	}

	@Action(GetSessionStatusCaptioner)
	private getSessionStatusCaptioner(
		{dispatch, getState, setState}: StateContext<SessionStateModel>,
		{sessionId, captionerPasscode}: GetSessionStatusCaptioner
	) {
		setState({...getState(), sessionId, captionerPasscode})

		return dispatch(
			new Send({
				type: MessageType.GetSessionStatus,
				data: {sessionId, captionerPasscode}
			})
		).pipe(
			switchMap(() =>
				this.actions.pipe(ofActionSuccessful(GetSessionStatusResponse))
			),
			map((response) => response.data)
		)
	}

	@Action(GetSessionStatusResponse)
	private getSessionStatusResponse(
		{setState, getState}: StateContext<SessionStateModel>,
		{data}: GetSessionStatusResponse
	) {
		return setState({
			...getState(),
			sessionInfo: data,
			pushingCaptions: Boolean(data.pushingCaptions)
		})
	}

	@Action(CheckAuthorised)
	private checkAuthorised(
		{getState, dispatch, setState}: StateContext<SessionStateModel>,
		{sessionId}: CheckAuthorised
	) {
		const {bookingPasscode, bookingPasscodeHash, bookingToken} = getState()

		return dispatch(
			new Send({
				type: MessageType.CheckAuthorised,
				data: {sessionId, bookingPasscode, bookingPasscodeHash, bookingToken}
			})
		).pipe(tap(() => setState({...getState(), sessionId})))
	}

	@Action(CheckAuthorisedCaptioner)
	private checkAuthorisedCaptioner(
		{getState, dispatch}: StateContext<SessionStateModel>,
		{sessionId}: CheckAuthorisedCaptioner
	) {
		const {captionerPasscode} = getState()

		return dispatch(
			new Send({
				type: MessageType.CheckAuthorised,
				data: {sessionId, captionerPasscode}
			})
		)
	}

	@Action(CheckAuthorisedResponse)
	private checkAuthorisedResponse(
		{setState, patchState}: StateContext<SessionStateModel>,
		{error, code, data}: CheckAuthorisedResponse
	) {
		if (code !== 200 && (error || data.reason)) {
			this.snack.open(error || data.reason, '', SnackConfig)
			return setState({captions: [], sentenceCounter: 0})
		}

		return patchState({sessionId: data.sessionId})
	}

	@Action(ViewerPasscodes)
	private viewerPasscodes(
		{setState, getState}: StateContext<SessionStateModel>,
		{bookingPasscodeHash, bookingPasscode, bookingToken}: ViewerPasscodes
	) {
		return setState({
			...getState(),
			bookingPasscodeHash,
			bookingPasscode,
			bookingToken
		})
	}

	@Action(CaptionerPasscode)
	private captionerPasscode(
		{getState, setState}: StateContext<SessionStateModel>,
		{captionerPasscode}: CaptionerPasscode
	) {
		return setState({...getState(), captionerPasscode})
	}

	@Action(SubscribeCaptioningResponse)
	private subscribeCaptioningResponse(
		{setState, getState, dispatch}: StateContext<SessionStateModel>,
		{data}: SubscribeCaptioningResponse
	) {
		const {bookingPasscode, bookingPasscodeHash, sessionId} = getState()

		setState({
			...getState(),
			lastChunkId: Number(data.lastChunkId),
			loading: true
		})

		return dispatch(
			new Send({
				type: MessageType.GetCaptionChunks,
				data: {
					lastChunkId: Number(getState().lastChunkId),
					bookingPasscode,
					bookingPasscodeHash,
					sessionId: Number(sessionId)
				}
			})
		)
	}

	@Action(GetCaptionChunksResponse)
	private getCaptionChunksResponse(
		{patchState}: StateContext<SessionStateModel>,
		{data}: GetCaptionChunksResponse
	) {
		const preparedCaptions: Partial<Caption>[][] = []

		if (data.Captions) {
			let indexes: number[] = []
			data.Captions.forEach((caption, index) => {
				if (caption.txt?.includes('.')) {
					indexes.push(index + 1)
				}
			})
			if (!indexes.length) {
				indexes = [data.Captions.length]
			}
			indexes.reduce((p, c) => {
				preparedCaptions.push(data.Captions.slice(p, c))
				return c
			}, 0)
		}

		return patchState({
			captions: preparedCaptions,
			sentenceCounter: preparedCaptions.length || 0,
			loading: false
		})
	}

	@Action(CaptionResponse)
	private captionResponseIncrement(
		{getState, patchState}: StateContext<SessionStateModel>,
		{data}: CaptionResponse
	) {
		if (data.txt.includes('.')) {
			console.log('new bubble')
			patchState({
				captions: [...getState().captions, []],
				sentenceCounter: getState().sentenceCounter + 1
			})
		}
	}

	@Action(CaptionResponse)
	private captionResponse(
		{getState, setState}: StateContext<SessionStateModel>,
		{data}: CaptionResponse
	) {
		if (data.update) {
			return setState({
				...getState(),
				lastChunkId: data.chunkId,
				captions: getState().captions.map((sentence) =>
					sentence.map((word) =>
						word.chunkId === data.chunkId
							? {...data, chunkId: word.chunkId}
							: word
					)
				)
			})
		}

		return setState({
			...getState(),
			lastChunkId: data.chunkId,
			captions: getState().captions.map((sentence, index) => {
				if (index + 1 === getState().sentenceCounter) {
					return [...sentence, data]
				}
				return sentence
			}),
			sentenceCounter: getState().captions.length
		})
	}

	@Action(GetChatsResponse)
	private getChatsResponse(
		{setState, getState}: StateContext<SessionStateModel>,
		{data}: GetChatsResponse
	) {
		return setState({
			...getState(),
			users: data.Users.filter(
				(u) => u.UserId !== this.store.selectSnapshot(UserState.userId)
			),
			chats: data.Chats.map((c) => {
				const time = Number(c.SentEpoch) * 1000
				const from = data.Users.find((u) => u.UserId === c.FromUserId)
				const fromName = from?.Name
				return {...c, FromUser: fromName, SentEpoch: time}
			})
		})
	}

	@Action(Chat)
	private chat(
		{getState, patchState}: StateContext<SessionStateModel>,
		{data}: Chat
	) {
		const newChat = {
			...data,
			SentEpoch: Number(new Date()),
			Txt: data.Message,
			Unread: 1
		}
		const {Message, ...tyBackend} = newChat
		return patchState({chats: [...(getState().chats || []), tyBackend]})
	}

	@Action(ReadMessage)
	private readMessage(
		{patchState, getState}: StateContext<SessionStateModel>,
		{ChatId}: ReadMessage
	) {
		return patchState({
			chats: (getState().chats || []).map((c) => ({
				...c,
				Unread: c.ChatId === ChatId ? 0 : c.Unread
			}))
		})
	}

	@Action(SpeakerAudioSendResponse)
	private speakerAudioSendResponse(
		{setState, getState}: StateContext<SessionStateModel>,
		{data}: SpeakerAudioSendResponse
	) {
		return setState({...getState(), twillioJwt: data.twillio_jwt})
	}

	@Action(Status)
	private status(
		{setState, getState}: StateContext<SessionStateModel>,
		{data}: Status
	) {
		return setState({
			...getState(),
			status: {...data},
			pushingCaptions: Boolean(data.pushingCaptions?.pushing)
		})
	}

	@Action(LeaveSession)
	private leaveSession({setState}: StateContext<SessionStateModel>) {
		return setState({captions: [], sentenceCounter: 0})
	}

	@Action(StartEditCaption)
	private startEditCaption(
		{patchState, getState}: StateContext<SessionStateModel>,
		{chunkId}: StartEditCaption
	) {
		if (getState().status?.autoCaptioning?.available) {
			return patchState({
				captions: (getState().captions || []).map((sentence) =>
					sentence.map((word) => ({
						...word,
						editMode: word.chunkId === chunkId
					}))
				)
			})
		} else {
			return getState()
		}
	}

	@Action(UpdateCaption)
	private updateCaption(
		{dispatch}: StateContext<SessionStateModel>,
		{caption}: UpdateCaption
	) {
		dispatch(new Send({type: MessageType.UpdateChunk, data: caption}))
	}

	@Action(StartCaptionPushResp)
	private startCaptionPushResp(
		{patchState}: StateContext<SessionStateModel>,
		{error, code}: StartCaptionPushResp
	) {
		error && this.snack.open(error, '', SnackConfig)
		return code === 200 && patchState({pushingCaptions: true})
	}

	@Action(StopCaptionPushResp)
	private stopCaptionPushResp(
		{patchState}: StateContext<SessionStateModel>,
		{error, code}: StartCaptionPushResp
	) {
		error && this.snack.open(error, '', SnackConfig)
		return code === 200 && patchState({pushingCaptions: false})
	}
}
