import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';


/*
  Generated class for the SocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocketServiceProvider {

  private url = 'https://musechat.herokuapp.com/';  
  private socket;

  constructor(public http: HttpClient) {
    console.log('Hello SocketServiceProvider Provider');
  }


  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('Received message', (data) => {
        observer.next(data);    
        
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  


}
