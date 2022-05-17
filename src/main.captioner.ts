import {enableProdMode} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'
import {CaptionerModule} from '@captioner/captioner.module'
import {environment} from '@env'

environment.production && enableProdMode()

platformBrowserDynamic()
	.bootstrapModule(CaptionerModule)
	.catch((err) => console.error(err))
