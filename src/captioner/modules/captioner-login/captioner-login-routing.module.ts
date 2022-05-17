import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {CaptionerLoginComponent} from './captioner-login.component'
import {CaptionerLoginGuard} from './captioner-login.guard'

const routes: Routes = [
	{
		path: '',
		component: CaptionerLoginComponent,
		canActivate: [CaptionerLoginGuard]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CaptionerLoginRoutingModule {}
