import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'

const routes: Routes = [
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
			import('./modules/viewer-quick-join/viewer-quick-join.module').then(
				(module) => module.ViewerQuickJoinModule
			)
	},
	{
		path: AppRoute.User,
		loadChildren: () =>
			import('./modules/viewer-session/viewer-session.module').then(
				(module) => module.ViewerSessionModule
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
export class ViewerRoutingModule {}
