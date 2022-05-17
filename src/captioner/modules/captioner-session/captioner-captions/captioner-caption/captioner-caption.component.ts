import {Component, Input} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Caption} from '@interface/response/caption.interface'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {
	StartEditCaption,
	UpdateCaption
} from '@shared/store/captioner/captioner.actions'

@Component({
	selector: 'app-captioner-caption',
	templateUrl: './captioner-caption.component.html',
	styleUrls: ['./captioner-caption.component.scss']
})
export class CaptionerCaptionComponent {
	@Input() public sentence: Caption[] | undefined
	public control = new FormControl()

	@Dispatch()
	public startEditCaption(word: Caption) {
		return new StartEditCaption(word.chunkId)
	}

	@Dispatch()
	public updateCaption(chunkId: number) {
		return new UpdateCaption({txt: this.control.value, final: 1, chunkId})
	}

	public tracking(index: number, word: Caption): string {
		return word.txt
	}
}
