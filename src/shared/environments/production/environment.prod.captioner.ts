import {Environment} from '../environment.interface'
import {Role} from '@enum/Role.enum'

export const environment: Environment = {
	production: true,
	name: 'production',
	logging: false,
	connection: 'wss://testmain.captionworks.com:3000/socket',
	transcript: 'https://testweb.captionworks.com:3000/',
	role: Role.Captioner,
	email: '',
	password: ''
}
