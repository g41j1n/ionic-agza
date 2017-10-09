import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ViewController  } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-mod-pass',
  templateUrl: 'mod-pass.html',
  template: `
  <ion-header>
  
      <ion-navbar primary>
               
          <ion-title>
            Nueva Contraseña
          </ion-title>
      
          <ion-buttons end>
            <button navPop ion-button icon-only>
              <ion-icon name="close-circle"></ion-icon>
            </button>
          </ion-buttons>
        </ion-navbar>
  
  </ion-header>
  <ion-content padding class="appBackground">
  <ion-card>
    <ion-card-content>
    <form [formGroup]="chPss" (ngSubmit)="passForm()">
      <ion-item>
        <ion-label floating>Nueva Contraseña</ion-label>
        <ion-input type="password" formControlName="pass"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Confirma Contraseña</ion-label>
        <ion-input type="password" formControlName="verify"></ion-input>
      </ion-item>
      <ion-item *ngIf="(chPss.get('verify').hasError('pw_mismatch') && (chPss.get('verify').dirty || chPss.get('verify').touched))">
      Las contraseñas no coinciden
      </ion-item>
      <ion-item>
      <button ion-button type="submit" full [disabled]="!chPss.valid">Enviar</button>
      </ion-item>
    </form>
    </ion-card-content>
  </ion-card>
  </ion-content>
  `
})
export class ModPassPage {
  private chPss : FormGroup;
  responseData : any;
  typeOf : any;
  constructor( private formBuilder: FormBuilder,public navCtrl : NavController ,params: NavParams, public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public viewCtrl :ViewController ) {
    this.typeOf = params.get('typeOf');
    this.chPss = this.formBuilder.group({
        pass: ['', Validators.compose([Validators.required])],
        verify: ['', Validators.compose([Validators.required])],
    },{'validator': this.isMatching});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModPassPage');
  }
  passForm(){
    let userData={"token":sessionStorage.getItem('token'),"NewPassword":this.chPss.value.pass,"tipoSolicitud":this.typeOf};
    console.log(userData);
    const loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });
    loading.present();
     this.authService.loginCred(userData,'changePassword?').then((result) => {
       this.chPss.reset();
      this.responseData = result;
      console.log(this.responseData);
        loading.dismiss();
      if (this.responseData.responseCode == 0 || this.responseData.responseCode === '00') {
        let alert = this.alertCtrl.create({
          title: 'Contraseña Actualizada',
          subTitle: 'La contraseña se actualizo correctamente',
          buttons: ['Aceptar']
        });
        alert.present();
        this.navCtrl.popToRoot();
        
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Intentelo nuevamente',
          buttons: ['Aceptar']
        });
        alert.present();
        this.chPss.reset();
      }
      // if (this.typeOf == 2 && this.typeOf !== 1 ) {
      //   this.viewCtrl.dismiss();
      // } else {
      //   // this.navCtrl.push(TabsPage);
      //   this.navCtrl.popToRoot();
      // }
    });
  }

  isMatching(group: FormGroup){
    var firstPassword = group.controls['pass'].value;
    var secondPassword = group.controls['verify'].value;
        if ( firstPassword != '' && secondPassword !='') {
          
          console.log("password check");
          
          if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
            console.log("mismatch");
            return { "pw_mismatch": true };
          } else{
            return null;
          }
        }
          
        }
        
        
        
      }





