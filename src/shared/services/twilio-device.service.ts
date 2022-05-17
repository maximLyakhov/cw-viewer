import {Injectable} from '@angular/core'
import {Call, Device} from '@twilio/voice-sdk'
import {from, Observable, of} from 'rxjs'
import {filter, switchMap, tap} from 'rxjs/operators'
import {AudioService} from './audio.service'

@Injectable({providedIn: 'root'})
export class TwilioDeviceService {
	private device: Device | undefined
	private call: Call | undefined
	private twilioJWT: string | undefined
	private twilioOptions: Device.Options = {
		codecPreferences: [Call.Codec.Opus]
	}

	constructor(private audio: AudioService) {}

	public createDevice(token: string): void {
		this.twilioJWT = token
		if (this.twilioJWT)
			this.device = new Device(this.twilioJWT, this.twilioOptions)
	}

	public setInputDevice(input: MediaDeviceInfo): void {
		if (this.device && this.device.audio) {
			if (navigator.userAgent.includes('Chrome')) {
				this.device.audio.setInputDevice(input.deviceId.toLowerCase()).then()
			}
		}
	}

	public connect(): Observable<boolean> {
		if (!this.device) return of(false)

		return from(this.device.connect()).pipe(
			tap((call) => (this.call = call)),
			switchMap(() => of(true)),
			filter((success) => success)
		)
	}

	public captionerConnect(): Observable<Call | boolean> {
		if (!this.device) return of(false)
		this.device.audio?.unsetInputDevice().then()
		return from(this.device.connect())
	}

	public destroy(): void {
		if (this.device) {
			this.device.destroy()
		}
	}

	public async disconnectAll(): Promise<void> {
		if (this.device) {
			this.audio.stopStream(this.device.audio!.inputStream!)
			this.call?.disconnect()
			this.device.disconnectAll()
			return this.device.audio?.unsetInputDevice()
		}
	}
}
