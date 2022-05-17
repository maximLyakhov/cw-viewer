import {Component} from '@angular/core'
import {FormControl, Validators} from '@angular/forms'
import {DialogRef} from '@service/dialog.service'

@Component({
	templateUrl: './captioner-passcode-dialog.component.html',
	styleUrls: ['./captioner-passcode-dialog.component.scss']
})
export class CaptionerPasscodeDialogComponent {
	public passcodeControl = new FormControl(null, [
		Validators.required,
		Validators.minLength(1)
	])

	constructor(public dialogRef: DialogRef) {}
}
