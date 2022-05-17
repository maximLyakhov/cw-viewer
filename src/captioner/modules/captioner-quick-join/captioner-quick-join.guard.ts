import {Injectable} from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {UserState} from '@shared/store/user/user.state'
import {from, Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class CaptionerQuickJoinGuard implements CanActivate {
	@SelectSnapshot(UserState.logged) logged!: boolean

	constructor(private router: Router) {}

	canActivate(
		_: ActivatedRouteSnapshot,
		__: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean | UrlTree {
		if (this.logged) {
			return true
		} else {
			return from(this.router.navigate([AppRoute.Login]))
		}
	}
}
