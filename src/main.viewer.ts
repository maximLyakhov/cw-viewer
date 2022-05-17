import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {environment} from '@env'
import {ViewerModule} from '@viewer/viewer.module'

environment.production && enableProdMode()

platformBrowserDynamic()
	.bootstrapModule(ViewerModule)
	.catch((err) => console.error(err))
