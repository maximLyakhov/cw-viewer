import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CaptionerSessionComponent} from './captioner-session.component'
import {CaptionerSessionGuard} from './captioner-session.guard'

const routes: Routes = [
	{
		path: '',
		component: CaptionerSessionComponent,
		canActivate: [CaptionerSessionGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CaptionerSessionRoutingModule {}
