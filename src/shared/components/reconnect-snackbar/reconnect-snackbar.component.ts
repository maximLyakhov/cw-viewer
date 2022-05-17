import {Component, Inject, OnInit} from '@angular/core'
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar'

@Component({
	selector: 'app-reconnect-snackbar',
	templateUrl: './reconnect-snackbar.component.html',
	styleUrls: ['./reconnect-snackbar.component.scss']
})
export class ReconnectSnackbarComponent implements OnInit {
	public message: string

	constructor(
		private snackbarRef: MatSnackBarRef<ReconnectSnackbarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: {message: string; delay: number}
	) {
		this.message = this.data.message
	}

	ngOnInit() {
		this.autoClose()
	}

	public reconnect() {
		this.snackbarRef.dismissWithAction()
	}

	private autoClose() {
		setTimeout(() => {
			this.snackbarRef.dismiss()
		}, this.data.delay * 1000)
	}
}
