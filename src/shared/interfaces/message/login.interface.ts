import {Role} from '@enum/Role.enum'

export interface Login {
	loginToken: string
	role: Role
}
