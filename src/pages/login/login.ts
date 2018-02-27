import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ModalController, Platform} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';

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
      <ion-card-header></ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item >
            <ion-grid>
              <ion-row>
                <ion-col ></ion-col >
                <ion-col class="centered-inside">
                  <ion-img src="https://ionicframework.com/img/ionic-logo-blog.png"></ion-img>
                </ion-col >
                <ion-col ></ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
          <form [formGroup]="login" (ngSubmit)="logForm()">
            <ion-item>
              <ion-icon name="mail" item-start></ion-icon>
              <ion-input [(ngModel)]="emailV" type="email" formControlName="email" placeholder="Correo Electronico" [disabled]="dsbl"></ion-input>
            </ion-item>
            <ion-item *ngIf="(login.get('email').hasError('pattern') && (login.get('email').dirty || login.get('email').touched))">
              Escriba un correo valido
            </ion-item>
            <ion-item>
              <ion-icon name="lock" item-start></ion-icon>
              <ion-input  [(ngModel)]="pwV" type="password" formControlName="password" placeholder="Contraseña" [disabled]="dsbl"></ion-input>
            </ion-item>
            <ion-item>
              <button ion-button type="submit" block round [disabled]="!login.valid">Entrar</button>
            </ion-item>
          </form>
        </ion-list>
      </ion-card-content>
    </ion-card>
    <ion-grid [class.hide]="fngr">
      <ion-row>
        <ion-col ></ion-col >
        <ion-col class="centered-inside">
            <button ion-button outline round color="primary" icon-only (click)="fingerTest()"> <ion-icon name="finger-print" ></ion-icon></button>
        </ion-col >
         <ion-col ></ion-col>
      </ion-row>
    </ion-grid>
    <ion-footer>
      <ion-toolbar position="bottom">
        <button  ion-button block round (click)="reset()">Solicitar Contraseña</button>
      </ion-toolbar>
    </ion-footer>
</ion-content>`
})
export class LoginPage {
  private login : FormGroup;
  responseData : any;
  emailV:any;
  pwV:any;
  fiOp: FingerprintOptions;
  dsbl: boolean = false;
  fngr: boolean =true;
  constructor( private plataform: Platform, private fingerprint: FingerprintAIO, private formBuilder: FormBuilder,public navCtrl: NavController,public navParams: NavParams,public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController,public modalCtrl: ModalController ) {
      this.login = this.formBuilder.group({
        email:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password:['',Validators.compose([Validators.required, Validators.minLength(1)])],
      });
      this.fiOp ={
        clientId: 'fingerprint-demo',
        clientSecret: 'password',
        disableBackup: true
      }
  }

  /* 
  Al iniciar la aplicación revisa si existe o no el usuario
  en el localStorage para asignarlo
  */
  ionViewDidLoad() {
    if(localStorage.getItem("name")){
      this.emailV= localStorage.getItem("name")
      this.pwV= localStorage.getItem("key")
    }
    if (localStorage.getItem("key")) {
     
      this.fingerTest(); 
    }
  }

  /* 
  funcion que formatea los datos del formulario de login 
  para enviar los datos al servidor. Si el servidor responde
  con los datos del usuario almacena dichos datos en sessionStorage 
  y localStorage y redirige a TabsPage
  */
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
      if ((auth === 0 || auth === '00' || auth === '0') && (this.responseData.firstLogin === 1 ||this.responseData.firstLogin === "1")) {
        loading.dismiss();
        sessionStorage.setItem('name',this.responseData.name);
        sessionStorage.setItem('companies', JSON.stringify(this.responseData.listCompanies));
        sessionStorage.setItem('token', this.responseData.token);
        localStorage.setItem('key', this.login.value.password);
        localStorage.setItem('name', this.login.value.email);
        this.navCtrl.setRoot(TabsPage);
      }
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
    },(err) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Conexion interrumpida',
        subTitle: 'no se ha podido conectar con el servidor',
        buttons: ['Aceptar']
      });
      alert.present();
    });
  }

  /* 
   redirige a la pagina de reset
  */
  reset(){
    this.navCtrl.push(ResetPage);
  }
  
  /* 
  revisa si existe el lector de huellas en el dispositivo
  si existe despliega el mensaje de autenticacion de huella
  */
  async fingerTest(){
    try{
      await this.plataform.ready();
      const av = await this.fingerprint.isAvailable();
      if(av === "OK"){
        this.dsbl =true;
        this.fngr=false;
        const res = await this.fingerprint.show(this.fiOp).then(e =>{
          this.logForm();
        });
      }
      if(av != "OK"){
      this.dsbl =false;
      }
    }
    catch(e){
      //errores despues de fallar huella
    }
  }
  // async fingerTest(){
  //   try{
  //     await this.plataform.ready();
  //     const av = await this.fingerprint.isAvailable();
  //     if(av === "OK"){
  //       const res = await this.fingerprint.show(this.fiOp);
  //       alert(res);
  //     }
  //   }
  //   catch(e){
  //     alert(e);
  //   }
  // }
}