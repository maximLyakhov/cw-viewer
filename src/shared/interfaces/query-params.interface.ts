interface MandatoryQueryParams {
	sessionId: number
}

export interface QueryParamsViewer extends MandatoryQueryParams {
	bookingPasscode: string
	bookingPasscodeHash: string
	bookingToken?: string
}

export interface QueryParamsCaptioner extends MandatoryQueryParams {
	captionerPasscode: string
}
