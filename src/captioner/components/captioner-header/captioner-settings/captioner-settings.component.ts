import {Component, OnInit} from '@angular/core'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {DialogRef, DialogService} from '@service/dialog.service'
import {UglySubList} from '@interface/sublist.interface'
import {Select} from '@ngxs/store'
import {CaptionerState} from '@shared/store/captioner/captioner.state'
import {Observable} from 'rxjs'
import {FormControl, FormGroup} from '@angular/forms'
import {AddDraftSubList} from '@shared/store/captioner/captioner.actions'
import {CloseConfirmPopupComponent} from '@cmp/captioner-settings/close-confirm-popup/close-confirm-popup.component'
import {filter, take} from 'rxjs/operators'

@Component({
	selector: 'app-captioner-captioner-settings',
	templateUrl: './captioner-settings.component.html',
	styleUrls: ['./captioner-settings.component.scss']
})
export class CaptionerSettingsComponent implements OnInit {
	@Select(CaptionerState.subLists) public subLists!: Observable<UglySubList[]>
	public sublistForm = new FormGroup({
		name: new FormControl(),
		notes: new FormControl(),
		subList: new FormControl(),
		subListId: new FormControl()
	})

	constructor(public dialogRef: DialogRef, public dialog: DialogService) {}

	@Dispatch() ngOnInit() {
		return new Send({type: MessageType.GetSubListSummary})
	}

	public chooseSubList(subList: Partial<UglySubList>): void {
		this.sublistForm.reset()
		this.sublistForm.setValue({
			...subList,
			subListId: subList.subListId || null
		})
	}

	@Dispatch()
	public addNewOne() {
		this.sublistForm.reset()
		return new AddDraftSubList()
	}

	@Dispatch()
	public saveOrUpdateSubList() {
		const formValue = this.sublistForm.value
		const subListItself: string = this.sublistForm.value.subList
		const mappedSubListItself = subListItself.split('\n')

		this.sublistForm.reset()

		if (formValue.subListId !== null) {
			return new Send({
				type: MessageType.UpdateSubList,
				data: {
					...formValue,
					subList: mappedSubListItself
				}
			})
		}
		const {subListId, subList, ...newSubList} = formValue

		return new Send({
			type: MessageType.CreateSubList,
			data: {...newSubList, subList: subList.split('\n')}
		})
	}

	@Dispatch()
	public deleteSubList() {
		const subListId = this.sublistForm.controls.subListId.value
		this.sublistForm.reset()
		return new Send({
			type: MessageType.DeleteSubList,
			data: {
				subListId
			}
		})
	}

	public openConfirmPopup() {
		this.dialog
			.open(CloseConfirmPopupComponent)
			.afterClosed()
			.pipe(take(1), filter(Boolean))
			.subscribe(() => this.dialogRef.close())
	}
}
