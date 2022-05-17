import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {ChangeComponent} from './change/change.component'
import {ChangeGuard} from './change/change.guard'
import {ResetGuard} from './reset.guard'
import {StartComponent} from './start/start.component'

const routes: Routes = [
	{
		path: '',
		component: StartComponent,
		canActivate: [ResetGuard]
	},
	{
		path: AppRoute.ChangePassword,
		component: ChangeComponent,
		canActivate: [ChangeGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ResetRoutingModule {}
