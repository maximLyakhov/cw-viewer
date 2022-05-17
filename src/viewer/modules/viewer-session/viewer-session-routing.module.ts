import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ViewerSessionComponent} from './viewer-session.component'
import {ViewerSessionGuard} from './viewer-session.guard'

const routes: Routes = [
	{
		path: '',
		component: ViewerSessionComponent,
		canActivate: [ViewerSessionGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ViewerSessionRoutingModule {}
