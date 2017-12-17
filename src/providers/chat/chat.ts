import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Api } from '../api/api';
import { Observable } from 'rxjs/Observable';


import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {



  constructor(public http: HttpClient,public api: Api) {
  
  }
  getOne(tema){
    return this.api.get('mensaje?tema='+tema+'');
  }

  private socket;
  
    connect(): Rx.Subject<MessageEvent> {
      // If you aren't familiar with environment variables then
      // you can hard code `environment.ws_url` as `http://localhost:5000`
      this.socket = io('http://musechat.herokuapp.com/');
  
      // We define our observable which will observe any incoming messages
      // from our socket.io server.
      let observable = new Observable(observer => {
        this.socket.on('Received message', (data) => {
         
          console.log("Received message from Websocket Server")
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
      });
  
      let observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };
  
      return Rx.Subject.create(observer, observable);
    }

}
