import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tema } from '../../models/tema';
import { Api } from '../api/api';

/*
  Generated class for the TemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TemaProvider {
  temas: Tema[] = [];

  constructor(public api: Api) {
    console.log('Hello TemaProvider Provider');
  }

  query(params?: any) {
    return this.api.get('tema', params);
    
  }

  add(tema: Tema) {
    var seq = this.api.post('tema', tema).share();
    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
       console.log(res);
        //this.temas.push(tema);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }

  delete(tema: Tema) {
  }

}
