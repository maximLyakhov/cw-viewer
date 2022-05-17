import {Component, Input} from '@angular/core'
import {AppRoute} from '@enum/AppRoute.enum'

@Component({
	selector: 'app-back-link',
	templateUrl: './back-link.component.html',
	styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent {
	@Input() destination: AppRoute | null = AppRoute.QuickJoin
}
