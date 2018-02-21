import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ObservacionesPage } from '../observaciones/observaciones';


import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-detalle-i',
  templateUrl: 'detalle-i.html',
})
export class DetalleIPage {
response: string;
status: boolean;
idPro : string;
pl:{};
  constructor(public navCtrl: NavController, public navParams: NavParams,public modal: ModalController,public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetalleIPage');
    // this.idPro = this.navParams.get('id');

  }
  agreed() {
    const modAg = this.modal.create('CalImpPage');
    modAg.present();
  }
  onCancel() {
    this.status= true ;
    const detMod = this.modal.create('ObservacionesPage');
    detMod.present();
  }
  onAccept() {
    this.status= false;
    this.onSubmit();
    
  }
  onSubmit() {
    this.pl = {id: this.idPro, response: this.response, status: this.status};
    this.authService.processReview(this.pl);
    this.navCtrl.popToRoot();
  }
}
