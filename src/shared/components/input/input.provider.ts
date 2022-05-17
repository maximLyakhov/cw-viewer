import {forwardRef} from '@angular/core'
import {NG_VALUE_ACCESSOR} from '@angular/forms'

export const InputProvider = (component: any) => [
	{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => component),
		multi: true
	}
]
