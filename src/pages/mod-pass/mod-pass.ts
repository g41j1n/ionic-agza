import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-mod-pass',
  templateUrl: 'mod-pass.html',
  template: `
  <ion-content padding class="appBackground">
  <ion-card>
    <ion-card-header>
      cambiar Contraseña
    </ion-card-header>
    <ion-card-content>
    <form [formGroup]="chPss" (ngSubmit)="passForm()">
      <ion-item>
        <ion-label floating>Contraseña Actual</ion-label>
        <ion-input type="password" formControlName="old"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Nueva Contraseña</ion-label>
        <ion-input type="password" formControlName="pass"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label floating>Confirma Contraseña</ion-label>
        <ion-input type="password" formControlName="verify"></ion-input>
      </ion-item>
      <button ion-button type="submit" [disabled]="!chPss.valid">Enviar</button>
    </form>
    </ion-card-content>
  </ion-card>
  </ion-content>
  `
})
export class ModPassPage {
  private chPss : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.chPss = this.formBuilder.group({
        old: ['',Validators.required],
        pass: ['', Validators.compose([Validators.required])],
        verify: ['', Validators.compose([Validators.required])],
    },{'validator': this.isMatching});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModPassPage');
  }
  passForm(){
    let userData={"token":sessionStorage.getItem('token'),"lastPassword":this.chPss.value.old,"NewPassword":this.chPss.value.pass,"tipoSolicitud":"2"};
    console.log(userData);
    
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





