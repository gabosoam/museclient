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
    var ingreso = this.api.post('tema', tema);
    this.temas.push(tema);
  }

  delete(tema: Tema) {
  }

}
