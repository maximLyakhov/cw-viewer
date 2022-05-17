import {Role} from '@enum/Role.enum'

export interface Login {
	loginToken: string
	connectionId: number
	role: Role
}
