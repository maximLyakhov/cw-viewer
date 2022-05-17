import {Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Engine} from '@enum/Engine.enum'
import {DialogRef} from '@service/dialog.service'
import {Select} from '@ngxs/store'
import {CaptionerState} from '@shared/store/captioner/captioner.state'
import {UglySubList} from '@interface/sublist.interface'
import {Observable} from 'rxjs'
import {MatCheckboxChange} from '@angular/material/checkbox'

@Component({
	templateUrl: './captioner-respeaking-dialog.component.html',
	styleUrls: ['./captioner-respeaking-dialog.component.scss']
})
export class CaptionerRespeakingDialogComponent {
	@Select(CaptionerState.subLists) public subLists!: Observable<UglySubList[]>
	public engines: ReadonlyArray<{title: string; value: Engine}> = [
		{title: 'Rev.ai', value: Engine.Revai},
		{title: 'Deepgram', value: Engine.Deepgram}
	]

	public audioForm = new FormGroup({
		input: new FormControl('', Validators.required),
		engine: new FormControl(Engine.Revai),
		save: new FormControl(false),
		userSubLists: new FormControl()
	})
	private chosenSubLists = new Set<number>()

	constructor(public dialogRef: DialogRef) {}

	public check(checkbox: MatCheckboxChange, subList: UglySubList) {
		checkbox.checked
			? this.chosenSubLists.add(subList.subListId)
			: this.chosenSubLists.delete(subList.subListId)

		this.audioForm.controls.userSubLists.setValue([...this.chosenSubLists])
	}
}
