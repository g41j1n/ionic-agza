
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ViewController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ObservacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observaciones',
  templateUrl: 'observaciones.html',
  template: `
  <ion-content padding>
  <ion-card>
    <ion-card-content>
      <ion-item>
        <img src="https://ionicframework.com/img/ionic-logo-blog.png">
      </ion-item>
      <form (ngSubmit)="chngrw()">
        <ion-item>
          <ion-label stacked>Ingrese fecha</ion-label>
          <ion-input type="date" [(ngModel)]="payload.fecha" name="title"></ion-input>
        </ion-item>
        <ion-item>
        <ion-label>Estatus</ion-label>
        <ion-select [(ngModel)]="payload.status" name="status">
          <ion-option value="1">1</ion-option>
          <ion-option value="2">2</ion-option>
          <ion-option value="6">6</ion-option>
        </ion-select>
      </ion-item>
      <ion-item>
          <ion-label stacked>Ingrese Comentario</ion-label>
          <ion-textarea [(ngModel)]="payload.comment" name="comment"></ion-textarea>
      </ion-item>
      <ion-item>
          <button ion-button type="submit"  block round>Enviar</button>
          </ion-item>
          </form>
          
          </ion-card-content>
          </ion-card>
</ion-content>
<ion-footer>
<ion-toolbar>
  <button ion-button color="danger" block (click)="back()" round>Cancelar</button>
</ion-toolbar>
</ion-footer>
  `
})
export class ObservacionesPage {
  constructor( private formBuilder: FormBuilder,public navCtrl: NavController,public navParams: NavParams,public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public viewCtrl :ViewController  ) {}
  payload={}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacionesPage');
  }
  chngrw(){
    console.log(this.payload);
  }
  back(){
    this.viewCtrl.dismiss();
  }
}
