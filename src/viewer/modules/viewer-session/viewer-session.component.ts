import {Component} from '@angular/core'
import {ISessionStatus} from '@interface/response/session-status.interface'
import {Select} from '@ngxs/store'
import {SessionState} from '@shared/store/session/session.state'
import {UserState} from '@shared/store/user/user.state'
import {Observable} from 'rxjs'

@Component({
	templateUrl: './viewer-session.component.html',
	styleUrls: ['./viewer-session.component.scss']
})
export class ViewerSessionComponent {
	@Select(SessionState.sessionInfo)
	public sessionInfo$!: Observable<ISessionStatus>
	@Select(SessionState.sessionId) public sessionId$!: Observable<number>
	@Select(UserState.logged) public logged$!: Observable<boolean>
}
