import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AppRoute} from '@enum/AppRoute.enum'
import {environment} from '@env'
import {Register} from '@interface/message/register.interface'
import {Region} from '@interface/response/timezone.interface'
import {Observable} from 'rxjs'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {MessageType} from '@enum/MessageType'
import {Select} from '@ngxs/store'

@Component({
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	@Select((state: any) => state.user.regions) public regions!: Observable<
		Region[]
	>
	@Select((state: any) => state.user.cities) public cities!: Observable<
		string[]
	>
	public loginRoute = AppRoute.Login
	public registerForm = new FormGroup({
		firstName: new FormControl('Johny', [
			Validators.required,
			Validators.minLength(1)
		]),
		lastName: new FormControl('Doe', [
			Validators.required,
			Validators.minLength(1)
		]),
		email: new FormControl('john.doe@gmail.com', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('123abc', [
			Validators.required,
			Validators.minLength(6)
		]),
		repassword: new FormControl('123abc', [
			Validators.required,
			Validators.minLength(6)
		]),
		region: new FormControl('', Validators.required),
		timezone: new FormControl('', Validators.required),
		role: new FormControl(environment.role, Validators.required)
	})

	@Dispatch()
	ngOnInit() {
		return new Send({type: MessageType.GetTimeZoneRegions})
	}

	@Dispatch()
	public chooseRegion(region: Region) {
		return new Send({
			type: MessageType.GetTimeZoneCities,
			data: {regionId: region.regionId}
		})
	}

	@Dispatch()
	public register() {
		const formData = this.registerForm.value
		const mappedRegData: Register = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
			asCaptioner: environment.role === 'captioner' ? 1 : 0,
			timeZone:
				(formData.timezone = `${formData.region.region}/${formData.timezone}`)
		}

		return new Send({type: MessageType.NewUser, data: {...mappedRegData}})
	}
}
