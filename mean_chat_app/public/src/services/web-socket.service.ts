
// import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()

export class WebsocketService {

  socket: any;

  constructor() {

  }

  establishSocketConnection() {
    let token = 'Bearer ' + JSON.parse(localStorage.getItem('loc-usr')).token;
    console.log('token', token);
    const socket = io('http://localhost:8100', {
      query: {
        token: token,
        id: JSON.parse(localStorage.getItem('loc-usr'))._id
      }
    });
    this.socket = socket;


    socket.on('connect', () => {
      console.log('socket.id', socket.id); // 'G5p5...'
    });
  }

  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  roomJoined() {
    const observable = new Observable<any>(observer => {
      this.socket.on('joined-room', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}