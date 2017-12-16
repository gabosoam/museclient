import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public http: HttpClient,public api: Api) {
    console.log('Hello ChatProvider Provider');
  }
  getOne(tema){
    return this.api.get('mensaje?tema='+tema+'&&sort=id%20ASC');
  }
}
