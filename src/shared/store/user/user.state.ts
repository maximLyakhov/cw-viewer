import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ReloginPopupComponent} from '@cmp/relogin-popup/relogin-popup.component'
import {AppRoute} from '@enum/AppRoute.enum'
import {MessageType} from '@enum/MessageType'
import {Role} from '@enum/Role.enum'
import {UserSettings} from '@interface/response/user-settings.interface'
import {Navigate} from '@ngxs/router-plugin'
import {
	Action,
	Actions,
	ofActionSuccessful,
	Selector,
	State,
	StateContext
} from '@ngxs/store'
import {DialogRef, DialogService} from '@service/dialog.service'
import {SnackConfig} from '@shared/configs/snack.config'
import {
	GetUserSettings,
	Login,
	Logout,
	Relogin,
	UserRequestedPasscode,
	ViewerSkippedLogin
} from '@shared/store/user/user.actions'
import {
	ChangePasswordResponse,
	CheckResetPasswordResponse,
	GetTimeZoneCitiesResponse,
	GetTimeZoneRegionsResponse,
	GetUserSettingsResponse,
	LogInResponse,
	LogOutResponse,
	NewUserResponse,
	ReLogInResponse,
	StartResetPasswordResponse
} from '@shared/store/websocket/websocket.response.actions'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {Region} from '@interface/response/timezone.interface'

export interface UserStateModel {
	role?: Role
	logged?: boolean
	anonymous?: boolean
	loginToken?: string
	userInfo?: UserSettings
	requestedPasscode?: boolean
	regions?: Region[]
	cities?: string[]
}

const freshUser = {
	logged: false,
	anonymous: false,
	userInfo: undefined
}

@State<UserStateModel>({name: 'user', defaults: freshUser})
@Injectable()
export class UserState {
	private dialogRef: DialogRef | undefined

	constructor(
		private dialog: DialogService,
		private snack: MatSnackBar,
		private actions: Actions
	) {}

	@Selector()
	public static userId(state: UserStateModel) {
		return state.userInfo?.userId
	}

	@Selector()
	public static userInfo(state: UserStateModel) {
		return state.userInfo
	}

	@Selector()
	public static anonymous(state: UserStateModel) {
		return state.anonymous
	}

	@Selector()
	public static requestedPasscode(state: UserStateModel): boolean | undefined {
		return state.requestedPasscode
	}

	@Selector()
	public static token(state: UserStateModel) {
		return state.loginToken
	}

	@Selector()
	public static logged(state: UserStateModel) {
		return state.logged
	}

	@Action(NewUserResponse)
	private newUser(
		{dispatch, patchState, getState, setState}: StateContext<UserStateModel>,
		{data, code, error}: NewUserResponse
	) {
		if (code === 200) {
			dispatch(new GetUserSettings())
			dispatch(new Navigate([AppRoute.QuickJoin]))

			return patchState({...data})
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack.open(error!, '', SnackConfig)
			return getState()
		}
	}

	@Action(Login)
	private login(
		{dispatch}: StateContext<UserStateModel>,
		{payload}: Login
	): Observable<void> {
		return dispatch(new Send({type: MessageType.LogIn, data: {...payload}}))
	}

	@Action(LogInResponse)
	private logInResponse(
		{getState, setState, dispatch}: StateContext<UserStateModel>,
		{data, code, error}: LogInResponse
	): UserStateModel {
		if (code !== 200) {
			this.snack.open(error!, '', SnackConfig)
			return getState()
		}
		dispatch(new GetUserSettings())

		return setState({...getState(), ...data})
	}

	@Action(GetUserSettings)
	private getUserSettings({
		dispatch
	}: StateContext<UserStateModel>): Observable<UserStateModel> {
		return dispatch(new Send({type: MessageType.GetUserSettings})).pipe(
			switchMap(() =>
				this.actions.pipe(ofActionSuccessful(GetUserSettingsResponse))
			)
		)
	}

	@Action(GetUserSettingsResponse)
	private getUserSettingsResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetUserSettingsResponse
	): UserStateModel {
		return setState({...getState(), userInfo: data, logged: true})
	}

	@Action(Relogin)
	private relogin({
		getState,
		dispatch,
		setState
	}: StateContext<UserStateModel>) {
		const {role, loginToken, logged} = getState()

		if (loginToken) {
			this.dialogRef = this.dialog.open(ReloginPopupComponent)
			return dispatch(
				new Send({type: MessageType.ReLogIn, data: {loginToken, role}})
			)
		}

		if (logged) {
			return getState()
		}

		return of(setState({...getState()})).pipe(
			switchMap(() => dispatch(new Navigate([AppRoute.Login])))
		)
	}

	@Action(ReLogInResponse)
	private reloginResponse(
		{getState, setState, dispatch}: StateContext<UserStateModel>,
		{data, code, error}: ReLogInResponse
	) {
		this.dialogRef!.close()

		if (code === 200) {
			setState({...getState(), ...data, logged: true})

			return dispatch(new GetUserSettings())
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack.open(error!, '', SnackConfig)

			return dispatch(new Navigate([AppRoute.Login]))
		}
	}

	@Action(Logout)
	private logout({dispatch}: StateContext<UserStateModel>) {
		return dispatch(new Send({type: MessageType.LogOut}))
	}

	@Action(LogOutResponse)
	private logOutResponse({getState, setState}: StateContext<UserStateModel>) {
		return setState({...getState(), ...freshUser, loginToken: undefined})
	}

	@Action(GetTimeZoneRegionsResponse)
	private GetTimeZoneRegionsResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetTimeZoneRegionsResponse
	) {
		return setState({...getState(), regions: data.regions})
	}

	@Action(GetTimeZoneCitiesResponse)
	private getTimeZoneCitiesResponse(
		{getState, setState}: StateContext<UserStateModel>,
		{data}: GetTimeZoneCitiesResponse
	) {
		return setState({...getState(), cities: data.cities})
	}

	@Action(StartResetPasswordResponse)
	private startResetPasswordResponse(
		{}: StateContext<UserStateModel>,
		{code, error}: StartResetPasswordResponse
	) {
		this.snack.open(
			code === 200
				? 'We just have sent you an email!'
				: error || 'Something gone wrong...',
			'',
			SnackConfig
		)
	}

	@Action(CheckResetPasswordResponse)
	private checkResetPasswordResponse(
		{}: StateContext<UserStateModel>,
		{code, error}: CheckResetPasswordResponse
	) {
		if (code !== 200 && error) {
			this.snack.open(error, '', SnackConfig)
		}
	}

	@Action(ChangePasswordResponse)
	private changePasswordResponse(
		{dispatch}: StateContext<UserStateModel>,
		{code, error}: ChangePasswordResponse
	) {
		if (code !== 200 && error) {
			return this.snack.open(error, '', SnackConfig)
		}
		return dispatch(new Navigate([AppRoute.Login]))
	}

	@Action(ViewerSkippedLogin)
	private viewerSkippedLogin(
		{setState, getState}: StateContext<UserStateModel>,
		{anonymous}: ViewerSkippedLogin
	): UserStateModel {
		return setState({...getState(), anonymous})
	}

	@Action(UserRequestedPasscode)
	private userRequestedPasscode(
		{patchState}: StateContext<UserStateModel>,
		{requestedPasscode}: UserRequestedPasscode
	) {
		return patchState({requestedPasscode})
	}
}
