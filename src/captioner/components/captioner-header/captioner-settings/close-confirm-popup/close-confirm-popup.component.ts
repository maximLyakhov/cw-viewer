import {Component} from '@angular/core'
import {DialogRef} from '@service/dialog.service'

@Component({
	selector: 'app-captioner-close-confirm-popup',
	templateUrl: './close-confirm-popup.component.html',
	styleUrls: ['./close-confirm-popup.component.scss']
})
export class CloseConfirmPopupComponent {
	constructor(private dialogRef: DialogRef) {}

	public sure() {
		this.dialogRef.close(true)
	}

	public pleaseNo() {
		this.dialogRef.close(false)
	}
}
