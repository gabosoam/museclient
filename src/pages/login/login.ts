import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: Storage) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  presentLoading() {
    
  }
  // Attempt to login in through our User service
  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.user.login(this.account).subscribe((resp) => {
      console.log('USUARIO'),
      console.log()
      this.storage.set('usuario', resp);
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
