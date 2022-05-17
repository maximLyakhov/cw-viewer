import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatBadgeModule} from '@angular/material/badge'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatRadioModule} from '@angular/material/radio'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {RouterModule} from '@angular/router'
import {AudioInputSelectComponent} from '@cmp/audio-input-select/audio-input-select.component'
import {BackLinkComponent} from '@cmp/back-link/back-link.component'
import {ButtonComponent} from '@cmp/button/button.component'
import {ElementInitDirective} from '@cmp/element-init.directive'
import {FooterComponent} from '@cmp/footer/footer.component'
import {IconComponent} from '@cmp/icon/icon.component'
import {InputComponent} from '@cmp/input/input.component'
import {LoaderComponent} from '@cmp/loader/loader.component'
import {LogoutDialogComponent} from '@cmp/logout-dialog/logout-dialog.component'
import {ReconnectSnackbarComponent} from '@cmp/reconnect-snackbar/reconnect-snackbar.component'
import {ReloginPopupComponent} from '@cmp/relogin-popup/relogin-popup.component'
import {SmallButtonComponent} from '@cmp/small-button/small-button.component'
import {NgSelectModule} from '@ng-select/ng-select'
import {PushCaptionsDialogComponent} from '@cmp/push-captions-dialog/push-captions-dialog.component'

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		RouterModule,
		MatRadioModule,
		MatSnackBarModule,
		MatBadgeModule,
		MatCheckboxModule
	],
	declarations: [
		ElementInitDirective,
		AudioInputSelectComponent,
		BackLinkComponent,
		ButtonComponent,
		FooterComponent,
		IconComponent,
		InputComponent,
		LoaderComponent,
		LogoutDialogComponent,
		ReconnectSnackbarComponent,
		ReloginPopupComponent,
		SmallButtonComponent,
		PushCaptionsDialogComponent
	],

	exports: [
		// Modules
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		RouterModule,
		MatRadioModule,
		MatSnackBarModule,
		MatBadgeModule,
		MatCheckboxModule,
		// Components
		ElementInitDirective,
		AudioInputSelectComponent,
		BackLinkComponent,
		ButtonComponent,
		FooterComponent,
		IconComponent,
		InputComponent,
		LoaderComponent,
		LogoutDialogComponent,
		ReconnectSnackbarComponent,
		ReloginPopupComponent,
		SmallButtonComponent,
		PushCaptionsDialogComponent
	]
})
export class SharedModule {}
