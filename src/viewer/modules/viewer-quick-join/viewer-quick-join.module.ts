import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SharedModule} from '@shared/shared.module'
import {ViewerQuickJoinRoutingModule} from './viewer-quick-join-routing.module'
import {ViewerQuickJoinComponent} from './viewer-quick-join.component'

@NgModule({
	declarations: [
		ViewerQuickJoinComponent //
	],
	imports: [
		CommonModule, //
		ViewerQuickJoinRoutingModule,
		SharedModule
	]
})
export class ViewerQuickJoinModule {}
