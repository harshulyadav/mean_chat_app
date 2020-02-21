import { Component } from '@angular/core';
import { WebsocketService } from 'src/services/web-socket.service';
import { ToastrService } from 'ngx-toastr';
// import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent {
  
  constructor(
    private websocketService: WebsocketService,
    private toastr: ToastrService,
    // private _pushNotificationService: PushNotificationService
  ) {
    // const isGranted = this._pushNotificationService.isPermissionGranted;
    // console.log('isGranted', isGranted)
  }

  ngOnInit() {
    console.log('called');
    this.websocketService.establishSocketConnection();
    // this._pushNotificationService.requestPermission();
    this.checkIfUserJoinedRoom();
  }

  joinChatRoom() {
    this.websocketService.joinRoom({user: 'Harshul', room: 123})
  }

  checkIfUserJoinedRoom() {
    this.websocketService.roomJoined().subscribe((result: any) => {
      console.log('Room joined', result);
      this.toastr.success(result.message, 'Success');
      // const title = 'Hello';
      // const options = new PushNotificationOptions();
      // options.body = result.message;

      // this._pushNotificationService.create(title, options).subscribe((notif) => {
      //   if (notif.event.type === 'show') {
      //     console.log('onshow');
      //     setTimeout(() => {
      //       notif.notification.close();
      //     }, 3000);
      //   }
      //   if (notif.event.type === 'click') {
      //     console.log('click');
      //     notif.notification.close();
      //   }
      //   if (notif.event.type === 'close') {
      //     console.log('close');
      //   }
      // }, (err) => {
      //      console.log(err);
      // });
    })
  }

}
