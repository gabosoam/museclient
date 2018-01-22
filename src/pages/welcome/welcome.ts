import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Storage } from '@ionic/storage';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
 

  constructor(
    public navCtrl: NavController,
    public user: User,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage) {

      storage.get('usuario').then((usuario) => {
        if(usuario){
          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });
          loader.present();
          this.user.login({ username: usuario.id.username,password: usuario.id.password }).subscribe((resp) => {
            console.log('USUARIO'),
              console.log()
            this.user._user = resp;
            this.navCtrl.push(MainPage);
      
            loader.dismiss();
          }, (err) => {
            // this.navCtrl.push(MainPage);
            // Unable to log in
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Algo salió mal!',
              subTitle: 'Por favor revisa la información de la cuenta e inténtalo de nuevo',
              buttons: ['OK']
            });
            alert.present();
      
          });

        }
        
      });
 
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  islogin() {
    
  
    this.user.islogin().subscribe((resp) => {
      console.log('USUARIO'),
        console.log(resp)
   
  
    }, (err) => {
     console.log(err)

    });
    
   
  }

  incognito() {

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.user.login({ username: 'anónimo', password: 'anonimo' }).subscribe((resp) => {
      console.log('USUARIO'),
        console.log()
      this.user._user = resp;
      this.navCtrl.push(MainPage);

      loader.dismiss();
    }, (err) => {
      // this.navCtrl.push(MainPage);
      // Unable to log in
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Algo salió mal!',
        subTitle: 'Por favor revisa la información de la cuenta e inténtalo de nuevo',
        buttons: ['OK']
      });
      alert.present();

    });
  }
}
