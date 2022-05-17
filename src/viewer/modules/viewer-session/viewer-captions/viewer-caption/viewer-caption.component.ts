import {Component, Input} from '@angular/core'
import {Caption} from '@interface/response/caption.interface'

@Component({
	selector: 'app-viewer-caption',
	templateUrl: './viewer-caption.component.html',
	styleUrls: ['./viewer-caption.component.scss']
})
export class ViewerCaptionComponent {
	@Input() public sentence: Caption[] | undefined
}
