import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {environment} from '@env'
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
import {DialogService} from '@service/dialog.service'
import {TwilioDeviceService} from '@service/twilio-device.service'
import {SharedModule} from '@shared/shared.module'
import {SessionState} from '@shared/store/session/session.state'
import {UserState} from '@shared/store/user/user.state'
import {WebsocketState} from '@shared/store/websocket/websocket.state'
import {ViewerHeaderComponent} from '@cmp/viewer-header.component'
import {ViewerLoginPopupComponent} from '@cmp/viewer-login-popup/viewer-login-popup.component'
import {ViewerRoutingModule} from './viewer-routing.module'
import {ViewerComponent} from './viewer.component'
import {NgxsDispatchPluginModule} from '@ngxs-labs/dispatch-decorator'
import {NgxsSelectSnapshotModule} from '@ngxs-labs/select-snapshot'

function initialize(store: Store) {
	return () => store.dispatch(new ConnectWebSocket())
}

@NgModule({
	declarations: [
		ViewerComponent,
		ViewerHeaderComponent,
		ViewerLoginPopupComponent
	],
	imports: [
		BrowserModule,
		ViewerRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		NgxsModule.forRoot(
			[
				SessionState, //
				UserState,
				WebsocketState
			],
			{
				developmentMode: !environment.production
			}
		),
		NgxsWebsocketPluginModule.forRoot({
			url: environment.connection
		}),
		NgxsStoragePluginModule.forRoot({
			key: [
				SessionState, //
				UserState,
				WebsocketState
			]
		}),
		NgxsDispatchPluginModule.forRoot(),
		NgxsSelectSnapshotModule.forRoot(),
		NgxsRouterPluginModule.forRoot(),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production
		}),
		NgxsLoggerPluginModule.forRoot({
			disabled: !environment.production,
			collapsed: true
		})
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initialize,
			deps: [Store],
			multi: true
		},
		AudioService,
		DialogService,
		TwilioDeviceService
	],
	bootstrap: [ViewerComponent]
})
export class ViewerModule {}
