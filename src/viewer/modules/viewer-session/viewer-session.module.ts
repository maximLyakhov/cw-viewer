import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SharedModule} from '@shared/shared.module'
import {ViewerCaptionComponent} from '@viewer/modules/viewer-session/viewer-captions/viewer-caption/viewer-caption.component'
import {ViewerCaptionsComponent} from '@viewer/modules/viewer-session/viewer-captions/viewer-captions.component'
import {ViewerChatComponent} from '@viewer/modules/viewer-session/viewer-chat/viewer-chat.component'
import {ViewerAudioInputDialogComponent} from '@viewer/modules/viewer-session/viewer-share-audio/viewer-audio-input-dialog/viewer-audio-input-dialog.component'
import {ViewerSessionRoutingModule} from './viewer-session-routing.module'
import {ViewerSessionComponent} from './viewer-session.component'
import {ViewerShareAudioComponent} from './viewer-share-audio/viewer-share-audio.component'
import {ViewerPushCaptionsComponent} from '@modules/viewer-session/viewer-push-captions/viewer-push-captions.component'

@NgModule({
	declarations: [
		ViewerSessionComponent,
		ViewerCaptionsComponent,
		ViewerCaptionComponent,
		ViewerChatComponent,
		ViewerShareAudioComponent,
		ViewerAudioInputDialogComponent,
		ViewerPushCaptionsComponent
	],
	imports: [
		CommonModule, //
		ViewerSessionRoutingModule,
		SharedModule
	]
})
export class ViewerSessionModule {}
