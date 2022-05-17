import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'

const routes: Routes = [
	{
		path: AppRoute.Login,
		loadChildren: () =>
			import('./modules/captioner-login/captioner-login.module').then(
				(module) => module.CaptionerLoginModule
			)
	},
	{
		path: AppRoute.Register,
		loadChildren: () =>
			import('../shared/modules/register/register.module').then(
				(module) => module.RegisterModule
			)
	},
	{
		path: AppRoute.ResetPassword,
		loadChildren: () =>
			import('../shared/modules/reset/reset.module').then(
				(module) => module.ResetModule
			)
	},
	{
		path: AppRoute.QuickJoin,
		loadChildren: () =>
			import('./modules/captioner-quick-join/captioner-quick-join.module').then(
				(module) => module.CaptionerQuickJoinModule
			)
	},
	{
		path: AppRoute.User,
		loadChildren: () =>
			import('./modules/captioner-session/captioner-session.module').then(
				(module) => module.CaptionerSessionModule
			)
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: AppRoute.QuickJoin
	}
]

@NgModule({
	// imports: [RouterModule.forRoot(routes, {enableTracing: true})],
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class CaptionerRoutingModule {}
