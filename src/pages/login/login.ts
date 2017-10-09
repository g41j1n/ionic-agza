import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ModalController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
import { ModPassPage } from '../mod-pass/mod-pass';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  template: `
  <ion-content padding class="appBackground">
  <ion-card>
    <ion-card-header>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <img src="https://ionicframework.com/img/ionic-logo-blog.png">
        </ion-item>
        <form [formGroup]="login" (ngSubmit)="logForm()">
          <ion-item>
            <ion-icon name="mail" item-start></ion-icon>
            <ion-input type="email" formControlName="email" placeholder="Correo Electronico"></ion-input>
            
          </ion-item>
          
          <ion-item *ngIf="(login.get('email').hasError('pattern') && (login.get('email').dirty || login.get('email').touched))">
          Escriba un correo valido
          </ion-item>
          <ion-item>
            <ion-icon name="lock" item-start></ion-icon>
            <ion-input  type="password" formControlName="password" placeholder="Contraseña"></ion-input>
          </ion-item>
         
          <ion-item>
            <button ion-button type="submit" block round [disabled]="!login.valid">Entrar</button>
          </ion-item>
        </form>
      </ion-list>
    </ion-card-content>
  </ion-card>
  <ion-footer no-shadow>
    <ion-toolbar position="bottom">
      <button  ion-button block round (click)="reset()">Solicitar Contraseña</button>
    </ion-toolbar>
  </ion-footer>
</ion-content>

`
})
export class LoginPage {
private login : FormGroup;
responseData : any;
constructor( private formBuilder: FormBuilder,public navCtrl: NavController,public navParams: NavParams,public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController,public modalCtrl: ModalController ) {
  this.login = this.formBuilder.group({
    email:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    password:['',Validators.compose([Validators.required, Validators.minLength(1)])],
  });
}

logForm(){
  const loading = this.loadingCtrl.create({
    content: 'Ingresando...',
    dismissOnPageChange: true
  });
  loading.present();
  console.log(this.login.value);
  this.authService.loginCred(this.login.value,'loginApp?').then((result) =>{
    this.responseData = result;
    let auth = this.responseData.responseCode;
    let reset = this.responseData.resetCode;
    console.log(this.responseData);
    if ((auth === 0 || auth === '00' || auth === '0') && (this.responseData.firstLogin === 1 ||this.responseData.firstLogin === "1")) {
      loading.dismiss();
      sessionStorage.setItem('name',this.responseData.name);
      sessionStorage.setItem('companies', JSON.stringify(this.responseData.listCompanies));
      sessionStorage.setItem('token', this.responseData.token);
      sessionStorage.setItem('email', this.responseData.email);
        this.navCtrl.setRoot(TabsPage);
      
    }
    // if ((auth === 0 || auth === '00' || auth === '0') && (this.responseData.firstLogin == 0 ||this.responseData.firstLogin == "0")) {
    //   loading.dismiss();
    //   console.log('first Login');
      
    //   sessionStorage.setItem('name',this.responseData.name);
    //   sessionStorage.setItem('companies', JSON.stringify(this.responseData.listCompanies));
    //   sessionStorage.setItem('token', this.responseData.token);
    //   sessionStorage.setItem('email', this.responseData.email);
    //   let modal = this.modalCtrl.create(ModPassPage);
    //   modal.present();
    // }
     else {
      this.login.reset();
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Acceso Denegado',
        subTitle: 'El usuario y/o contraseña son invalidos',
        buttons: ['Aceptar']
      });
      alert.present();

    }
  }, (err) => {
    loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Conexion interrumpida',
      subTitle: 'no se ha podido conectar con el servidor',
      buttons: ['Aceptar']
    });
    alert.present();
  });


}
reset(){
  this.navCtrl.push(ResetPage);
}
}