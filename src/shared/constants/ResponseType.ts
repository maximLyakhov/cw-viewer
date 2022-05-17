export enum ResponseType {
	/** { loginToken } */
	NewUserResponse = 'newUserResp',
	/** { loginToken, connectionId, role } */
	LogInResponse = 'loginResp',
	/** { loginToken, connectionId, role } */
	ReLogInResponse = 'reLoginResp',
	/** { } */
	LogOutResponse = 'logoutResp',
	/** { timeZone } */
	GetUserSettingsResponse = 'getUserSettingsResp',
	/** { */
	CheckAuthorisedResponse = 'checkAuthorisedResp',
	/** { } */
	StartResetPasswordResponse = 'startResetPasswordResp',
	/** { } */
	CheckResetPasswordResponse = 'checkResetPasswordResp',
	/** { } */
	ChangePasswordResponse = 'changePasswordResp',
	/** { regions: [{ regionId, region }] }*/
	GetTimeZoneRegionsResponse = 'getTimeZoneRegionsResp',
	/** { regionId, cities: [ <string> ]}*/
	GetTimeZoneCitiesResponse = 'getTimeZoneCitiesResp',
	/** { title, startEpoch, sessionDurationMins, sessionLive, sessionCaptioning, connectedCaptioners: [ userId ], autoCaptioningAvailable } */
	GetSessionStatusResponse = 'getSessionStatusResp',
	/** { } */
	StartCaptioningResponse = 'startCaptioningResp',
	/** { chunkId } */
	SendChunkResponse = 'sendChunkResp',
	/** { } */
	StopCaptioningResponse = 'stopCaptioningResp',
	/** { } */
	UpdateChunkResp = 'updateChunkResp',
	/** { captioner-captions: {txt, chunkId, final} } */
	GetCaptionChunksResponse = 'getCaptionChunksResp',
	/** { } */
	UnsubscribeCaptioningResponse = 'unsubscribeCaptioningResp',
	/** { twillioJwt } */
	SpeakerAudioReceiveResponse = 'speakerAudioRecvResp',
	/** { } */
	TurnOnAudioDelivery = 'activateCapAudioResp',
	/** { } */
	TurnOffAudioDelivery = 'deactivateCapAudioResp',
	/** { } */
	StartAutoCaptioningResponse = 'startAutoCaptioningResp',
	/** { } */
	StopAudioCaptioningResponse = 'stopAudioCaptioningResp',
	/** { } */
	SpeakerAudioSendResponse = 'speakerAudioSendResp',
	/** { } */
	SubscribeCaptioningResponse = 'subscribeCaptioningResp',
	/** { } */
	CaptionResponse = 'caption',
	/** { chats: [{ txt, chatId, sentEpoch, fromUserId }], users: [{ userId, name }] } */
	GetChatsResponse = 'getChatsResp',
	/** { } */
	UnsubscribeChatResponse = 'unsubscribeChatResp',
	/** { txt, chatId, fromUserId, toUserId } */
	Chat = 'chat',
	/** { downloadUrl } */
	PrepareSessionTranscriptResp = 'prepareSessionTranscriptResp',

	AutoCaptioningStarted = 'autoCaptionStart',
	/** <<-- async messages -->> */
	Status = 'status',
	/** { subLists: [{ subListId, name, notes }] } */
	GetSubListSummaryResponse = 'getSubListSummaryResp',
	/** { subListId }*/
	CreateSubListResponse = 'createSubListResp',
	/** { subListId, name, notes, subList }*/
	GetSubListResponse = 'getSubListResp',
	/** { subListId }*/
	UpdateSubListResponse = 'updateSubListResp',
	/** { } */
	DeleteSubListResponse = 'delSubListResp',
	/** { }*/
	StartCaptionPushResponse = 'startCaptionPushResp',
	/** { } */
	StopCaptionPushResponse = 'stopCaptionPushResp'
}
