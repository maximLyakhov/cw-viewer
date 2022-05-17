import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {MessageType} from '@enum/MessageType'
import {ChatEntry, ChatUser} from '@interface/chat.interfaces'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {Select} from '@ngxs/store'
import {animations} from '@shared/configs/chat.animations'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable} from 'rxjs'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {UserState} from '@shared/store/user/user.state'
import {SessionState} from '@shared/store/session/session.state'
import {ReadMessage} from '@shared/store/session/session.actions'

@Component({
	animations,
	selector: 'app-viewer-chat',
	templateUrl: './viewer-chat.component.html',
	styleUrls: ['./viewer-chat.component.scss']
})
export class ViewerChatComponent implements OnInit, OnDestroy {
	@SelectSnapshot(UserState.userId) public userId!: number
	@Select(SessionState.chats) public messages$!: Observable<ChatEntry[]>
	@Select(SessionState.users) public users$!: Observable<ChatUser[]>
	@Select(SessionState.unreadMessages)
	public unreadMessages$!: Observable<number>
	public chatInput: FormControl = new FormControl()
	public isOpen: boolean = false
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number
	@SelectSnapshot(SessionState.bookingPasscode) private bookingPasscode:
		| string
		| undefined
	@SelectSnapshot(SessionState.bookingPasscodeHash)
	private bookingPasscodeHash: string | undefined

	@Dispatch()
	ngOnInit() {
		return [
			new Send({
				type: MessageType.GetChats,
				data: {
					sessionId: this.sessionId
				}
			}),
			new Send({
				type: MessageType.SubscribeChat,
				data: {
					sessionId: this.sessionId,
					bookingPasscode: this.bookingPasscode,
					bookingPasscodeHash: this.bookingPasscodeHash
				}
			})
		]
	}

	public toggle(): void {
		this.isOpen = !this.isOpen
	}

	public scrollToLast(el: HTMLDivElement): void {
		return el.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'start'
		})
	}

	@Dispatch()
	public readMessage(ChatId: number) {
		return new ReadMessage(ChatId)
	}

	@Dispatch()
	public sendChat() {
		const inputValue = this.chatInput.value
		this.chatInput.reset()
		return new Send({type: MessageType.SendChat, data: {txt: inputValue}})
	}

	@Dispatch()
	ngOnDestroy() {
		return new Send({
			type: MessageType.UnsubscribeChat,
			data: {sessionId: this.sessionId}
		})
	}
}
