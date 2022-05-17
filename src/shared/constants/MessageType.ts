export enum MessageType {
	/** { email, password, timeZone*, captioner-session* } */
	NewUser = 'newUser',
	/** { email, password, captioner-session } */
	LogIn = 'login',
	/** { loginToken } */
	ReLogIn = 'reLogin',
	/** { } */
	LogOut = 'logout',
	/** { } */
	GetUserSettings = 'getUserSettings',
	/** { sessionId, bookingPasscode*, bookingPasscodeHash*, captionerPasscode* } */
	CheckAuthorised = 'checkAuthorised',
	/** { email } */
	StartResetPassword = 'startResetPassword',
	/** { email, passwordChangeToken } */
	CheckResetPassword = 'checkResetPassword',
	/** { email, changePasswordToken, password } */
	ChangePassword = 'changePassword',
	/** { } */
	GetTimeZoneRegions = 'getTimeZoneRegions',
	/** { regionId } */
	GetTimeZoneCities = 'getTimeZoneCities',
	/** { sessionId } */
	GetSessionStatus = 'getSessionStatus',
	/** { sessionId, captionerPasscode } */
	StartCaptioning = 'startCaptioning',
	/** { txt, final* } */
	SendChunk = 'sendChunk',
	/** { chunkId, txt, final* } */
	UpdateChunk = 'updateChunk',
	/** { } */
	StopCaptioning = 'stopCaptioning',
	/** { sessionId, bookingPasscode*, captionerPasscode*, bookingPasscodeHash* } */
	SubscribeCaptioning = 'subscribeCaptioning',
	/** { sessionId,  bookingPasscode*,  bookingPasscodeHash*, lastChunkId, chunkCount } */
	GetCaptionChunks = 'getCaptionChunks',
	/** { sessionId } */
	UnsubscribeCaptioning = 'unsubscribeCaptioning',
	/** { sessionId } */
	SpeakerAudioReceive = 'speakerAudioRecv',
	/** { sessionId, engineId*, userSubLists* } */
	TurnOnAudioDelivery = 'activateCapAudio',
	/** { } */
	TurnOffAudioDelivery = 'deactivateCapAudio',
	/** { sessionId } */
	StartAutoCaptioning = 'startAutoCaptioning',
	/** { sessionId } */
	StopAutoCaptioning = 'stopAutoCaptioning',
	/** { sessionId } */
	SpeakerSendAudio = 'speakerAudioSend',
	/** { sessionId, bookingPasscode*, bookingPasscodeHash*, captionerPasscode* } */
	SubscribeChat = 'subscribeChat',
	/** { txt, toUserId* } */
	SendChat = 'sendChat',
	/** { sessionId, beforechatId } */
	GetChats = 'getChats',
	/** { sessionId } */
	UnsubscribeChat = 'unsubscribeChat',
	/** { sessionId, bookingPasscode*, bookingPasscodeHash*, captionerPasscode* } */
	PrepareSessionTranscript = 'prepareSessionTranscript',
	/** { } */
	GetSubListSummary = 'getSubListSummary',
	/** { name, notes, subList }*/
	CreateSubList = 'createSubList',
	/** { subListId }*/
	GetSubList = 'getSubList',
	/** { subListId, name*, notes*, subList* } */
	UpdateSubList = 'updateSubList',
	/** { subListId } */
	DeleteSubList = 'delSubList',
	/** {sessionId: url, lineLength, lineCount, lineByLine} */
	StartCaptionPush = 'startCaptionPush',
	/** { } */
	StopCaptionPush = 'stopCaptionPush'
}
