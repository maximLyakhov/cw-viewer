import {Component, Input} from '@angular/core'
import {ControlValueAccessor} from '@angular/forms'
import {InputProvider} from './input.provider'

@Component({
	selector: 'app-input-component',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: InputProvider(InputComponent)
})
export class InputComponent implements ControlValueAccessor {
	@Input() inputLabel: string | undefined
	@Input() inputPlaceholder: string | undefined
	@Input() inputType: string | undefined
	@Input() inputAutocomplete: string | undefined
	@Input() inputName!: string | number | null
	@Input() inputDisabled: boolean | string = false
	@Input() errorMessage = ''
	value = ''

	onChange: any = () => {}

	onTouch: any = () => {}

	registerOnChange(fn: any): void {
		this.onChange = fn
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn
	}

	writeValue(value: string): void {
		this.value = value
	}
}
