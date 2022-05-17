export interface IStatus {
	sessionId: number
	autoCaptionStop?: {engId: number}
	autoCaptionStart?: {engId: number}
	captionerStarted?: {userId: number; name: string}
	captionerStopped?: {userId: number; name: string}
	autoCaptioning?: {available: number}
	pushingCaptions?: {pushing: 1 | 0}
}
