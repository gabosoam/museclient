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

    this.cargar();


    
  }

  cargar(){
   
    var seq = this.tema.getOne(this.item.id);
    seq.subscribe((res: any) => {
     console.log('nuevito')
      console.log(res)
     this.temas = res
    }, err => {
      console.error('ERROR', err);
    });
  }

  openItem(tema: Tema) {
   
    this.navCtrl.push('ChatPage', {
      tema: tema
    });
  }

  addItem() {
    let addModal = this.modalCtrl.create('ChatPage');
    addModal.onDidDismiss(tema => {
      if (tema) {
       
  
       tema.tipoTema = this.item.id;
       tema.usuario = this.user._user.id;
    
       let seq = this.tema.add(tema);
       seq.subscribe((res: any) => {
        this.cargar();
      }, err => {
        console.error('ERROR', err);
      });
       
      }
    })
    addModal.present();
  }

}
