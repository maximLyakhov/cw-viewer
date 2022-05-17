import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SharedModule} from '@shared/shared.module'
import {CaptionerCaptionComponent} from './captioner-captions/captioner-caption/captioner-caption.component'
import {CaptionerCaptionsComponent} from './captioner-captions/captioner-captions.component'
import {CaptionerMacroBarComponent} from './captioner-captions/captioner-macro-bar/captioner-macro-bar.component'
import {CaptionerMacroDialogComponent} from './captioner-captions/captioner-macro-bar/captioner-macro-dialog/captioner-macro-dialog.component'
import {CaptionerChatComponent} from './captioner-chat/captioner-chat.component'
import {CaptionerPasscodeDialogComponent} from './captioner-passcode-dialog/captioner-passcode-dialog.component'
import {CaptionerSessionRoutingModule} from './captioner-session-routing.module'
import {CaptionerSessionComponent} from './captioner-session.component'
import {CaptionerAutoCaptioningComponent} from './captioner-toolbar/captioner-auto-captioning/captioner-auto-captioning.component'
import {CaptionerRespeakingDialogComponent} from './captioner-toolbar/captioner-respeaking/captioner-respeaking-dialog/captioner-respeaking-dialog.component'
import {CaptionerRespeakingComponent} from './captioner-toolbar/captioner-respeaking/captioner-respeaking.component'
import {CaptionerSpeakerAudioComponent} from './captioner-toolbar/captioner-speaker-audio/captioner-speaker-audio.component'
import {CaptionerPushCaptionsComponent} from './captioner-toolbar/captioner-push-captions/captioner-push-captions.component'

@NgModule({
	declarations: [
		CaptionerSessionComponent,
		CaptionerPasscodeDialogComponent,
		CaptionerRespeakingDialogComponent,
		CaptionerSpeakerAudioComponent,
		CaptionerRespeakingComponent,
		CaptionerAutoCaptioningComponent,
		CaptionerChatComponent,
		CaptionerCaptionsComponent,
		CaptionerCaptionComponent,
		CaptionerMacroBarComponent,
		CaptionerMacroDialogComponent,
		CaptionerPushCaptionsComponent
	],
	imports: [CommonModule, CaptionerSessionRoutingModule, SharedModule]
})
export class CaptionerSessionModule {}
