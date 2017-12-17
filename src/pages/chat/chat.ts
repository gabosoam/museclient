import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { SocketServiceProvider } from '../../providers/providers';
import { ChatProvider } from '../../providers/providers';
import { User } from '../../providers/providers';

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
export class ChatPage implements OnInit {
  tema: any;
  mensajes = [];
  editorMsg = '';

  connection;
  message;
  usuario



  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, 
    public chatProvider: ChatProvider, 
    public socketser: SocketServiceProvider,
    public user: User) {

  
        
  
    
      this.tema = navParams.get('tema');



this.cargarMensajes();

     
  }

  ngOnInit() {
 
    this.connection = this.socketser.getMessages().subscribe(message => {
      var cosa = JSON.stringify(message);
     var data = JSON.parse(cosa);


      if(this.tema.id == data.data.tema){
        this.mensajes.push({descripcion:data.data.descripcion,createdAt:data.data.createdAt, usuario:{id: data.usuario.id,imagen: data.usuario.imagen, username: data.usuario.username}});

        this.scrollToBottom();
      }else{
  
      }
    

     
      
    
    })
    
  }


  cargarMensajes(){
   
    var seq = this.chatProvider.getOne(this.tema.id);
    seq.subscribe((res: any) => {
     this.mensajes = res
     console.log(this.mensajes)
    // this.mensajes.push({descripcion: "hola", usuario:{imagen: "asd"}});
     this.scrollToBottom();
    }, err => {
      console.error('ERROR', err);
    });
  }

  sendMsg() {
    console.log('hola')
    if (!this.editorMsg.trim()) return;

    let nuevoMensaje = {
        tema: this.tema.id,
        usuario: this.user._user.id,
        descripcion: this.editorMsg,
    };

    var seq = this.chatProvider.enviarMensaje(nuevoMensaje);
    seq.subscribe((res: any) => {
      this.editorMsg = '';
      
  
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
        if (!this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
}

 

}
