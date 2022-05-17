import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CaptionerLoginRoutingModule} from './captioner-login-routing.module'
import {CaptionerLoginComponent} from './captioner-login.component'
import {SharedModule} from '@shared/shared.module'

@NgModule({
	declarations: [CaptionerLoginComponent],
	imports: [CommonModule, CaptionerLoginRoutingModule, SharedModule]
})
export class CaptionerLoginModule {}
