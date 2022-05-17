import {animate, state, style, transition, trigger} from '@angular/animations'

export const animations = [
	trigger('openClose', [
		state('open', style({width: '332px'})),
		state('closed', style({width: '64px'})),
		transition('open => closed', [animate('0.4s')]),
		transition('closed => open', [animate('0.4s')])
	])
]
