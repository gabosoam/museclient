import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/providers';
import { Items } from '../../providers/providers';
import { TemaProvider } from '../../providers/providers';
import { Tema } from '../../models/tema';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  ionViewDidLoad() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    this.cargar();
  }

  temas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public user: User,
    items: Items,
    public tema: TemaProvider,  ) {

      this.cargar();
  }


  cargar(){
    console.log('hola')
    let usuario = this.user._user.id.id;
    console.log(usuario)
    var seq = this.tema.obtenerHistorico(usuario);
    seq.subscribe((res: any) => {
      
   console.log(res);
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

  login() {
    
    this.navCtrl.push('LoginPage');
  }

}
