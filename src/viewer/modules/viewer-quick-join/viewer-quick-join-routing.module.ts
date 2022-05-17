import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ViewerQuickJoinComponent} from './viewer-quick-join.component'

const routes: Routes = [
	{
		path: '',
		component: ViewerQuickJoinComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ViewerQuickJoinRoutingModule {}
