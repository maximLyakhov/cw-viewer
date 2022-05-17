import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Directive({selector: '[appElementInit]'})
export class ElementInitDirective implements OnInit {
	@Input() isLast: boolean | undefined
	@Output() initEvent: EventEmitter<any> = new EventEmitter()

	ngOnInit() {
		if (this.isLast) requestAnimationFrame(() => this.initEvent.emit())
	}
}
