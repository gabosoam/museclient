import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Tema } from '../../models/tema';

import { Items } from '../../providers/providers';
import { TemaProvider } from '../../providers/providers';
import { User } from '../../providers/providers';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  temas: any;

  constructor(public navCtrl: NavController,
    public tema: TemaProvider, 
    navParams: NavParams, 
    items: Items, 
    public user: User,
    public modalCtrl: ModalController) {

    this.item = navParams.get('item');
    this.temas = navParams.get('item').temas;
    console.log(this.temas)
  }

  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(tema => {
      if (tema) {
        
  
       tema.tipoTema = this.item.id;
       tema.usuario = this.user._user.id;
       alert(JSON.stringify(tema))
       this.tema.add(tema);
      }
    })
    addModal.present();
  }

}
