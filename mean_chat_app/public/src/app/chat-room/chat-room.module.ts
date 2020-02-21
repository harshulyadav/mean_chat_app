import { NgModule } from '@angular/core';

import { ChatRoomRoutingModule } from './chat-room.routing.module';

import { ChatRoomComponent } from './chat-room.component';

import { WebsocketService } from 'src/services/web-socket.service';

@NgModule({
  declarations: [
    ChatRoomComponent
  ],
  imports: [
    ChatRoomRoutingModule,
  ],
  providers: [
    WebsocketService
  ],
})

export class ChatRoomModule { }