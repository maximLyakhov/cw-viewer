import {Role} from '@enum/Role.enum'

export interface Environment {
	name: 'local' | 'development' | 'production' | 'fail'
	production: boolean
	logging: boolean
	connection: string
	transcript: string
	role: Role
	email: string
	password: string
}
