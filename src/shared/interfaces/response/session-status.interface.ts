export interface ISessionStatus {
	title: string
	startEpoch: number
	sessionLive: number
	requirePasscode: number
	sessionCaptioning: number
	sessionDurationMins: number
	connectedCaptioners: string[]
	autoCaptioningAvailable: number
	pushingCaptions: 1 | 0
}
