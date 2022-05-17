import {Component, OnInit} from '@angular/core'
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms'
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy'
import {Store} from '@ngxs/store'
import {DialogRef} from '@service/dialog.service'
import {ClearMacros} from '@shared/store/captioner/captioner.actions'
import {MacroArray} from '../captioner-macro-bar.interfaces'

@UntilDestroy()
@Component({
	selector: 'app-captioner-macro-dialog',
	templateUrl: './captioner-macro-dialog.component.html',
	styleUrls: ['./captioner-macro-dialog.component.scss']
})
export class CaptionerMacroDialogComponent implements OnInit {
	public macroForm: FormGroup = this.fb.group({
		macroArray: this.fb.array([])
	})

	constructor(
		public dialogRef: DialogRef,
		private fb: FormBuilder,
		private store: Store
	) {}

	get controlArray(): FormArray {
		return this.macroForm.controls.macroArray as FormArray
	}

	ngOnInit() {
		this.store
			.select((state) => state.captioner.macros)
			.pipe(untilDestroyed(this))
			.subscribe((macros: MacroArray) => {
				if (macros) {
					this.controlArray.clear()
					macros.forEach((macro) => {
						this.controlArray.push(
							this.fb.group({
								name: new FormControl(macro.name, [
									Validators.required,
									Validators.minLength(1)
								]),
								value: new FormControl(macro.value, [
									Validators.required,
									Validators.minLength(1)
								])
							})
						)
					})
				}
			})
	}

	public addNewMacro() {
		this.controlArray.push(
			this.fb.group({
				name: new FormControl(''),
				value: new FormControl('')
			})
		)
	}

	public clearAllMacros(): void {
		this.controlArray.clear()
		this.store.dispatch(new ClearMacros())
		this.dialogRef.close([])
	}

	public deleteMacro(index: number): void {
		this.controlArray.removeAt(index)
	}
}
