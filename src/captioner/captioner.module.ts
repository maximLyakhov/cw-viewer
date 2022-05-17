import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {environment} from '@env'
import {SocketMessage} from '@interface/socket-message.interface'
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot'
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin'
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin'
import {NgxsRouterPluginModule} from '@ngxs/router-plugin'
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin'
import {NgxsModule, Store} from '@ngxs/store'
import {
	ConnectWebSocket,
	NgxsWebsocketPluginModule
} from '@ngxs/websocket-plugin'
import {AudioService} from '@service/audio.service'
import {TwilioDeviceService} from '@service/twilio-device.service'
import {SharedModule} from '@shared/shared.module'
import {CaptionerState} from '@shared/store/captioner/captioner.state'
import {SessionState} from '@shared/store/session/session.state'
import {UserState} from '@shared/store/user/user.state'
import {WebsocketState} from '@shared/store/websocket/websocket.state'
import {CaptionerRoutingModule} from './captioner-routing.module'
import {CaptionerComponent} from './captioner.component'
import {CaptionerHeaderComponent} from '@cmp/captioner-header.component'
import {CaptionerSettingsComponent} from '@cmp/captioner-settings/captioner-settings.component'
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator'
import {CloseConfirmPopupComponent} from '@cmp/captioner-settings/close-confirm-popup/close-confirm-popup.component'

function initialize(store: Store) {
	return () => store.dispatch(new ConnectWebSocket())
}

@NgModule({
	bootstrap: [CaptionerComponent],
	declarations: [
		CaptionerComponent,
		CaptionerHeaderComponent,
		CaptionerSettingsComponent,
		CloseConfirmPopupComponent
	],
	imports: [
		BrowserModule,
		CaptionerRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		NgxsModule.forRoot(
			[CaptionerState, SessionState, UserState, WebsocketState],
			{
				developmentMode: !environment.production
			}
		),
		NgxsWebsocketPluginModule.forRoot({
			url: environment.connection,
			serializer: (data: SocketMessage<any> | Blob) =>
				data instanceof Blob ? (data as any) : JSON.stringify(data)
		}),
		NgxsStoragePluginModule.forRoot({
			key: [CaptionerState, SessionState, UserState, WebsocketState]
		}),
		NgxsDispatchPluginModule.forRoot(),
		NgxsSelectSnapshotModule.forRoot(),
		NgxsRouterPluginModule.forRoot(),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production
		}),
		NgxsLoggerPluginModule.forRoot({
			disabled: environment.production,
			collapsed: true
		})
	],
	providers: [
		AudioService,
		TwilioDeviceService,
		{
			provide: APP_INITIALIZER,
			useFactory: initialize,
			deps: [Store],
			multi: true
		}
	]
})
export class CaptionerModule {}
