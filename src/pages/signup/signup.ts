import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Camera } from '@ionic-native/camera';

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
    public camera: Camera) {

      this.form = formBuilder.group({
        imagen: [''],
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

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'imagen': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

 
}
