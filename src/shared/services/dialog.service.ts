import {
	ComponentType,
	Overlay,
	OverlayRef,
	PositionStrategy
} from '@angular/cdk/overlay'
import {ComponentPortal} from '@angular/cdk/portal'
import {Injectable, InjectionToken, Injector, NgZone} from '@angular/core'
import {Observable, Subject} from 'rxjs'

export interface DialogConfig {
	data?: any
}

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA')

export class DialogRef {
	private afterClosedSubject = new Subject<any>()

	constructor(private overlayRef: OverlayRef) {}

	public close(result?: any) {
		this.overlayRef.dispose()
		this.afterClosedSubject.next(result)
		this.afterClosedSubject.complete()
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable()
	}
}

@Injectable({providedIn: 'root'})
export class DialogService {
	constructor(
		private overlay: Overlay,
		private injector: Injector,
		private zone: NgZone
	) {}

	open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
		const positionStrategy: PositionStrategy = this.overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically()

		const overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			panelClass: 'overlay-panel',
			backdropClass: 'overlay-backdrop'
		})

		const dialogRef = new DialogRef(overlayRef)

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{provide: DialogRef, useValue: dialogRef},
				{provide: DIALOG_DATA, useValue: config?.data}
			]
		})

		this.zone.run(() => {
			const portal = new ComponentPortal(component, null, injector)
			overlayRef.attach(portal)
		})

		return dialogRef
	}
}
