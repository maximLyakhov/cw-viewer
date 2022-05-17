import {Environment} from '../environment.interface'
import {Role} from '@enum/Role.enum'

export const environment: Environment = {
	production: false,
	name: 'development',
	logging: true,
	connection: 'wss://testmain.captionworks.com:3000/socket',
	transcript: 'https://testweb.captionworks.com:3000/',
	role: Role.Captioner,
	email: 'test2@gmail.com',
	password: 'abc123'
}

console.log(`[environment]: ${environment.name} | ${environment.role}`)
