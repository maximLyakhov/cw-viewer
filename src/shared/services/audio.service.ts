import {Injectable} from '@angular/core'
import {from, Observable} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AudioService {
	private devices: MediaDevices = navigator.mediaDevices
	private options: MediaRecorderOptions = {
		mimeType: 'audio/webm',
		audioBitrateMode: 'variable' as BitrateMode
	}

	public mediaRecorder(
		audioInput: string
	): Observable<{recorder: MediaRecorder; stream: MediaStream}> {
		return from(this.devices.getUserMedia(this.constraints(audioInput))).pipe(
			map((mediaStream) => ({
				recorder: new MediaRecorder(mediaStream, this.options),
				stream: mediaStream
			}))
		)
	}

	public stopStream(mediaStream: MediaStream): void {
		if (!mediaStream) return
		return mediaStream.getTracks().forEach((track) => track.stop())
	}

	private constraints = (audioInput: string): MediaStreamConstraints => ({
		video: false,
		audio: {
			channelCount: 1,
			autoGainControl: true,
			noiseSuppression: true,
			deviceId: audioInput
		}
	})
}
