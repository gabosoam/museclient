import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Tema } from '../../models/tema';

import { Items } from '../../providers/providers';
import { TemaProvider } from '../../providers/providers';
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  temas: any;

  constructor(public navCtrl: NavController,public tema: TemaProvider, navParams: NavParams, items: Items, public modalCtrl: ModalController) {
    this.item = navParams.get('item');
    this.temas = navParams.get('item').temas;
    console.log(this.temas)
  }

  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(tema => {
      if (tema) {
        this.tema.add(tema);
        alert(JSON.stringify(tema));
      }
    })
    addModal.present();
  }

}
