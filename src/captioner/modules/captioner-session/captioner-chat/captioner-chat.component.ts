import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl} from '@angular/forms'
import {MessageType} from '@enum/MessageType'
import {ChatEntry, ChatUser} from '@interface/chat.interfaces'
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy'
import {Dispatch} from '@ngxs-labs/dispatch-decorator'
import {SelectSnapshot} from '@ngxs-labs/select-snapshot'
import {Select, Store} from '@ngxs/store'
import {animations} from '@shared/configs/chat.animations'
import {SessionState} from '@shared/store/session/session.state'
import {UserState} from '@shared/store/user/user.state'
import {Send} from '@shared/store/websocket/websocket.send.actions'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {ReadMessage} from '@shared/store/session/session.actions'

@UntilDestroy()
@Component({
	animations,
	selector: 'app-captioner-chat',
	styleUrls: ['./captioner-chat.component.scss'],
	templateUrl: './captioner-chat.component.html'
})
export class CaptionerChatComponent implements OnInit, OnDestroy {
	@SelectSnapshot(UserState.userId) public userId!: number
	public isOpen: boolean = false
	public chatInput: FormControl = new FormControl()
	public userSelect: FormControl = new FormControl()
	public currentChat!: Observable<Partial<ChatEntry>[]>
	@Select(SessionState.users) public users$!: Observable<ChatUser[]>
	@Select(SessionState.unreadMessages)
	public unreadMessages$!: Observable<number>
	@SelectSnapshot(SessionState.sessionId) private sessionId!: number
	@SelectSnapshot(SessionState.captionerPasscode)
	private captionerPasscode!: string

	constructor(private store: Store) {
		this.userSelect.valueChanges
			.pipe(untilDestroyed(this))
			.pipe()
			.subscribe((userId: number) => {
				this.currentChat = this.store
					.select((state) => state.session.chats)
					.pipe(
						map((u: ChatEntry[]) =>
							u.filter((u) => u.FromUserId === userId || u.ToUserId === userId)
						)
					)
			})
	}

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
					captionerPasscode: this.captionerPasscode
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
	public readMessage(ChunkId: number) {
		return new ReadMessage(ChunkId)
	}

	@Dispatch()
	public sendChat(): Send {
		const inputValue = this.chatInput.value
		this.chatInput.reset()

		return new Send({
			type: MessageType.SendChat,
			data: {
				txt: inputValue,
				toUserId: this.userSelect.value,
				sessionId: this.sessionId,
				captionerPasscode: this.captionerPasscode
			}
		})
	}

	@Dispatch()
	ngOnDestroy(): Send {
		return new Send({
			type: MessageType.UnsubscribeChat,
			data: {sessionId: this.sessionId}
		})
	}
}
