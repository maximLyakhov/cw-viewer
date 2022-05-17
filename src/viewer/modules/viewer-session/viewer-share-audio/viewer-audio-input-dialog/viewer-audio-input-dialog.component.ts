import {Component} from '@angular/core'
import {FormControl, Validators} from '@angular/forms'
import {DialogRef} from '@service/dialog.service'

@Component({
	selector: 'app-viewer-audio-input-dialog',
	templateUrl: './viewer-audio-input-dialog.component.html',
	styleUrls: ['./viewer-audio-input-dialog.component.scss']
})
export class ViewerAudioInputDialogComponent {
	public audioDeviceControl = new FormControl('', Validators.required)

	constructor(public dialogRef: DialogRef) {}
}
