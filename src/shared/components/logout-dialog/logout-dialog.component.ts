import {Component} from '@angular/core'
import {DialogRef} from '@service/dialog.service'

@Component({
	selector: 'app-logout-dialog',
	templateUrl: './logout-dialog.component.html'
})
export class LogoutDialogComponent {
	constructor(private dialogRef: DialogRef) {}

	public close() {
		this.dialogRef.close()
	}

	public accept() {
		this.dialogRef.close(true)
	}
}
