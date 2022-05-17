import {Environment} from '../environment.interface'
import {Role} from '@enum/Role.enum'

export const environment: Environment = {
	production: false,
	name: 'local',
	logging: true,
	connection: 'ws://localhost:3000/socket',
	transcript: 'localhost:3000/',
	role: Role.Viewer,
	email: 'test1@gmail.com',
	password: 'abc123'
}

console.log(`[environment]: ${environment.name} | ${environment.role}`)
