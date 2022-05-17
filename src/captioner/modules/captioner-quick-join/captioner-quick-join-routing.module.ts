import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CaptionerQuickJoinComponent} from './captioner-quick-join.component'
import {CaptionerQuickJoinGuard} from './captioner-quick-join.guard'

const routes: Routes = [
	{
		path: '',
		component: CaptionerQuickJoinComponent,
		canActivate: [CaptionerQuickJoinGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CaptionerQuickJoinRoutingModule {}
