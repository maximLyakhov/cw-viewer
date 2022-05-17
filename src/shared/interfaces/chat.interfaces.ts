export interface ChatEntry {
	Txt: string
	ChatId: number
	SentEpoch: number
	FromUserId: number
	ToUserId: number
	Message: string
	SessionId: number
	Unread: number
	FromUser: string
}

export interface ChatUser {
	UserId: number
	Name: string
}
