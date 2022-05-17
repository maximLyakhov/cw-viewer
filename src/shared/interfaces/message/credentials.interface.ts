import {Role} from '@enum/Role.enum'

export interface Credentials {
	email: string
	password: string
	role: Role
}
