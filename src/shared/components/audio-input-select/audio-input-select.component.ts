import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormControl, Validators} from '@angular/forms'

@Component({
	selector: 'app-audio-input-select',
	templateUrl: './audio-input-select.component.html',
	styleUrls: ['audio-input-select.component.scss']
})
export class AudioInputSelectComponent implements OnInit {
	public audioDevices: MediaDeviceInfo[] = []
	@Input() public showSave: boolean | undefined
	@Output() public chosenAudioDevice = new EventEmitter<MediaDeviceInfo>()
	@Output() public selectionSaved = new EventEmitter()
	public audioDeviceControl = new FormControl(null, Validators.required)
	public saveDeviceControl = new FormControl()

	async ngOnInit() {
		if (navigator.mediaDevices) {
			await navigator.mediaDevices
				.getUserMedia({
					audio: true,
					video: false
				})
				.then(async (_) => {
					const devices = await navigator.mediaDevices?.enumerateDevices()
					_.getAudioTracks().forEach((track) => track.stop())
					this.audioDevices = devices.filter((el) => el.kind === 'audioinput')
				})
		} else {
			this.audioDevices = []
		}
	}
}
