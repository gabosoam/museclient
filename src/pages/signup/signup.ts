import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'signup.html'
})
export class SignupPage {

  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  
    form: FormGroup;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { password: string, image: string } = {
    password: '',
    image: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public loadingCtrl: LoadingController) {

      this.form = formBuilder.group({
        imagen: ['data:image/png;base64,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'],
        username: [''],
        
        password: [''],
      });
  
      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    this.presentLoading();
    // Attempt to login in through our User service
    this.user.signup(this.form.value).subscribe((resp) => {
      this.navCtrl.push('LoginPage');
    }, (err) => {

   //   this.navCtrl.push(MainPage);

      // Unable to sign up
      let alert = this.alertCtrl.create({
        title: 'Algo salió mal!',
        subTitle: 'Por favor revisa la información de la cuenta e inténtalo de nuevo',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['imagen'].value + ')'
  }
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'imagen': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Espere un momento...",
     duration: 3000
    });
    loader.present();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'imagen': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

 
}
