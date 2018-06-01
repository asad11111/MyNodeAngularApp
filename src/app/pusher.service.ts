import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
declare const Pusher: any;
@Injectable()

export class PusherService {
    pusher: any;
    messagesChannel: any;
   
  
    constructor() {
    
      this.pusher = new Pusher('33a4da173eb9b8ad3bed', {
        authEndpoint: 'http://localhost:3000/pusher/auth',
        cluster: 'ap2',
      encrypted: true
      });
      this.channel = this.pusher.subscribe('vote-channel');
      this.messagesChannel = this.pusher.subscribe('private-messages');
    }
     channel;

    public init() {
      return this.channel;
    }


  }
