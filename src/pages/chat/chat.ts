import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatProvider } from '../../providers/providers';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  tema: any;
  mensajes : any;

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public chatProvider: ChatProvider) {

      this.tema = navParams.get('tema');

    


this.cargarMensajes();
this.scrollToBottom();
     
  }

  cargarMensajes(){
    var seq = this.chatProvider.getOne(this.tema.id);
    seq.subscribe((res: any) => {

      console.log(res)
     this.mensajes = res
    }, err => {
      console.error('ERROR', err);
    });
  }

 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
  onFocus() {

    this.content.resize();
    this.scrollToBottom();
}

  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
}

 

}
