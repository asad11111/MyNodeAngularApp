import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http'
declare const Pusher: any;
@Injectable()

export class PusherService {
    pusher: any;
    messagesChannel: any;
   
  
    constructor(protected http: HttpClient) {
      
      this.pusher = new Pusher('33a4da173eb9b8ad3bed', {
        authEndpoint: `http://localhost:3000/pusher/auth`,
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
