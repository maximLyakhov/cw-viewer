import {Injectable} from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router'
import {AppRoute} from '@enum/AppRoute.enum'
import {from, Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class ResetGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		_: RouterStateSnapshot
	): Observable<boolean | UrlTree> | boolean | UrlTree {
		const {passwordChangeToken, email} = route.queryParams
		if (passwordChangeToken && email) {
			return from(
				this.router.navigate(
					[AppRoute.ResetPassword, AppRoute.ChangePassword],
					{
						queryParams: {
							passwordChangeToken,
							email
						}
					}
				)
			)
		}
		return true
	}
}
