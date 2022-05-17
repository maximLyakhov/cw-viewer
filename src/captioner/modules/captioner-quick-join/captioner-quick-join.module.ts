import {NgModule} from '@angular/core'
import {SharedModule} from '@shared/shared.module'
import {CaptionerQuickJoinRoutingModule} from './captioner-quick-join-routing.module'
import {CaptionerQuickJoinComponent} from './captioner-quick-join.component'

@NgModule({
	declarations: [CaptionerQuickJoinComponent],
	imports: [SharedModule, CaptionerQuickJoinRoutingModule]
})
export class CaptionerQuickJoinModule {}
