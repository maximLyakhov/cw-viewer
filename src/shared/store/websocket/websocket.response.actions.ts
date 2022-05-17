import {HttpStatusCode} from '@angular/common/http'
import {ResponseType} from '@enum/ResponseType'
import {Role} from '@enum/Role.enum'
import {IStatus} from '@interface/response/status.interface'
import {UserSettings} from '@interface/response/user-settings.interface'
import {ChatEntry, ChatUser} from '@interface/chat.interfaces'
import {Caption} from '@interface/response/caption.interface'
import {SubList} from '@interface/sublist.interface'
import {Cities, Regions} from '@interface/response/timezone.interface'
import {ISessionStatus} from '@interface/response/session-status.interface'
import {SubscribedCaptioning} from '@interface/response/subscribed-captioning.interface'
import {LoginTwilio} from '@interface/response/login-twilio.interface'
import {ICheckAuthorised} from '@interface/response/check-authorised'

export class NewUserResponse {
	static readonly type = ResponseType.NewUserResponse

	constructor(
		public data: {loginToken: string; connectionId: string; role: Role},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class LogInResponse {
	static readonly type = ResponseType.LogInResponse

	constructor(
		public data: {loginToken: string; connectionId: string; role: Role},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class ReLogInResponse {
	static readonly type = ResponseType.ReLogInResponse

	constructor(
		public data: {loginToken: string; connectionId: string; role: Role},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class LogOutResponse {
	static readonly type = ResponseType.LogOutResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetUserSettingsResponse {
	static readonly type = ResponseType.GetUserSettingsResponse

	constructor(
		public data: UserSettings,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class CheckAuthorisedResponse {
	static readonly type = ResponseType.CheckAuthorisedResponse

	constructor(
		public data: ICheckAuthorised,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StartResetPasswordResponse {
	static readonly type = ResponseType.StartResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class CheckResetPasswordResponse {
	static readonly type = ResponseType.CheckResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class ChangePasswordResponse {
	static readonly type = ResponseType.ChangePasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetTimeZoneRegionsResponse {
	static readonly type = ResponseType.GetTimeZoneRegionsResponse

	constructor(
		public data: Regions,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetTimeZoneCitiesResponse {
	static readonly type = ResponseType.GetTimeZoneCitiesResponse

	constructor(
		public data: Cities,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetSessionStatusResponse {
	static readonly type = ResponseType.GetSessionStatusResponse

	constructor(
		public data: ISessionStatus,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StartCaptioningResponse {
	static readonly type = ResponseType.StartCaptioningResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StopCaptioningResponse {
	static readonly type = ResponseType.StopCaptioningResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class SendChunkResponse {
	static readonly type = ResponseType.SendChunkResponse

	constructor(
		public data: {chunkId: number},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class UpdateChunkResp {
	static readonly type = ResponseType.UpdateChunkResp

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetCaptionChunksResponse {
	static readonly type = ResponseType.GetCaptionChunksResponse

	constructor(
		public data: {Captions: Partial<Caption>[]},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class SubscribeCaptioningResponse {
	static readonly type = ResponseType.SubscribeCaptioningResponse

	constructor(public data: SubscribedCaptioning) {}
}

export class UnsubscribeCaptioningResponse {
	static readonly type = ResponseType.UnsubscribeCaptioningResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class SpeakerAudioReceiveResponse {
	static readonly type = ResponseType.SpeakerAudioReceiveResponse

	constructor(
		public data: {twilioJwt: string},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class TurnOnAudioDeliveryResponse {
	static readonly type = ResponseType.TurnOnAudioDelivery

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class TurnOffAudioDeliveryResponse {
	static readonly type = ResponseType.TurnOffAudioDelivery

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StartAutoCaptioningResponse {
	static readonly type = ResponseType.StartAutoCaptioningResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class StopAudioCaptioningResponse {
	static readonly type = ResponseType.StopAudioCaptioningResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class SpeakerAudioSendResponse {
	static readonly type = ResponseType.SpeakerAudioSendResponse

	constructor(
		public data: LoginTwilio,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class CaptionResponse {
	static readonly type = ResponseType.CaptionResponse

	constructor(
		public data: Caption,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class GetChatsResponse {
	static readonly type = ResponseType.GetChatsResponse

	constructor(
		public data: {
			Chats: Partial<ChatEntry>[]
			Users: ChatUser[]
		},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class UnsubscribeChatResponse {
	static readonly type = ResponseType.UnsubscribeChatResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class Chat {
	static readonly type = ResponseType.Chat

	constructor(
		public data: ChatEntry,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class PrepareSessionTranscriptResp {
	static readonly type = ResponseType.PrepareSessionTranscriptResp

	constructor(
		public data: {downloadUrl: string},
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {}
}

export class Status {
	static readonly type = ResponseType.Status

	constructor(public data: IStatus) {}
}

export class CreateSubListResponse {
	static readonly type = ResponseType.CreateSubListResponse

	constructor(public data: {SubListId: number}) {}
}

export class GetSubListSummaryResponse {
	static readonly type = ResponseType.GetSubListSummaryResponse

	constructor(public data: {subLists: SubList[]}) {}
}

export class GetSubListResponse {
	static readonly type = ResponseType.GetSubListResponse

	constructor(public data: SubList) {}
}

export class UpdateSubListResponse {
	static readonly type = ResponseType.UpdateSubListResponse

	constructor(public data: {SubListId: number}) {}
}

export class DeleteSubListResponse {
	static readonly type = ResponseType.DeleteSubListResponse

	constructor() {}
}

export class StartCaptionPushResp {
	static readonly type = ResponseType.StartCaptionPushResponse

	constructor(public error?: string, public code?: HttpStatusCode) {}
}

export class StopCaptionPushResp {
	static readonly type = ResponseType.StopCaptionPushResponse

	constructor(public error?: string) {}
}
