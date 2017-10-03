import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ModalController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
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
        <form [formGroup]="login" (ngSubmit)="logForm()">
          <ion-item>
            <ion-icon name="mail" item-start></ion-icon>
            <ion-input type="email" formControlName="email" placeholder="Correo Electronico"></ion-input>
          </ion-item>
          <ion-item>
            <ion-icon name="lock" item-start></ion-icon>
            <ion-input  type="password" formControlName="password" placeholder="Contraseña"></ion-input>
          </ion-item>
          <button ion-button type="submit" full [disabled]="!login.valid">Entrar</button>
        </form>
      </ion-list>
    </ion-card-content>
  </ion-card>
  <button class="fixed-bottom" ion-button full (click)="reset()">Solicitar Contraseña</button>
</ion-content>

`
})
export class LoginPage {
private login : FormGroup;
responseData : any;
constructor( private formBuilder: FormBuilder,public navCtrl: NavController,public navParams: NavParams,public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController ) {
  this.login = this.formBuilder.group({
    email:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    password:['',Validators.compose([Validators.required, Validators.minLength(1)])],
  });
}

logForm(){
  const loading = this.loadingCtrl.create({
    content: 'Ingresando...'
  });
  loading.present();
  console.log(this.login.value);
  this.authService.loginCred(this.login.value,'loginApp?').then((result) =>{
    this.responseData = result;
    let auth = this.responseData.responseCode;
    let reset = this.responseData.resetCode;
    console.log(this.responseData);
    if (auth === 0 || auth === '00' || auth === '0') {
      loading.dismiss();
      console.log(this.responseData.responseCode);  
      sessionStorage.setItem('name',this.responseData.name);
      sessionStorage.setItem('companies', JSON.stringify(this.responseData.listCompanies));
      sessionStorage.setItem('token', this.responseData.token);
      sessionStorage.setItem('email', this.responseData.email);
      // if(auth === 0 || auth === '00' || auth === '0'){
        this.navCtrl.push(TabsPage);

      // }else{
        //TODO: Go to modal
      // }
      
    } else {
      // clear forms
      this.login.reset();
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Acceso Denegado',
        subTitle: 'El usuario y/o contraseña son invalidos',
        buttons: ['Aceptar']
      });
      alert.present();

    }
  });


}
reset(){
  this.navCtrl.push(ResetPage);
}
}