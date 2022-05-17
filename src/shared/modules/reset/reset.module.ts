import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SharedModule} from '@shared/shared.module'
import {ChangeComponent} from './change/change.component'
import {ResetRoutingModule} from './reset-routing.module'
import {StartComponent} from './start/start.component'
import {ResetDispatcher} from '@shared/modules/reset/reset.dispatcher'

@NgModule({
	declarations: [
		StartComponent, //
		ChangeComponent
	],
	imports: [
		CommonModule, //
		ResetRoutingModule,
		SharedModule
	],
	providers: [ResetDispatcher]
})
export class ResetModule {}
