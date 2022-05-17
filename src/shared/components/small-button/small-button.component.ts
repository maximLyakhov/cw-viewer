import {Component, Input} from '@angular/core'

@Component({
	selector: 'app-small-button',
	templateUrl: './small-button.component.html',
	styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {
	@Input() buttonText: string | undefined
	@Input() inverted: boolean | undefined
	@Input() buttonDisabled: boolean | undefined
	@Input() autofocus: boolean | undefined
	@Input() small: boolean | undefined
	@Input() icon: string | undefined
}
