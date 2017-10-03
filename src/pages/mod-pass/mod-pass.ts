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
      <button ion-button type="submit" full [disabled]="!chPss.valid">Enviar</button>
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
     this.authService.loginCred(userData,'changePasswordMenu?').then((result) => {
       this.chPss.reset();
      this.responseData = result;
      console.log(this.responseData);
      loading.dismiss();
      if (this.typeOf == 2 && this.typeOf !== 1 ) {
        this.viewCtrl.dismiss();
      } else {
        this.navCtrl.push(TabsPage);
      }
    });
  }

  isMatching(group: FormGroup){
    
        console.log("password check");
    
        var firstPassword = group.controls['pass'].value;
        var secondPassword = group.controls['verify'].value;
        if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
          console.log("mismatch");
          return { "pw_mismatch": true };
        } else{
          return null;
        }
    
      }

  
  
}





