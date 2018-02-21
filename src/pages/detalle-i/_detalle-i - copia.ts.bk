import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the DetalleIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-i',
  templateUrl: 'detalle-i.html',
})
export class DetalleIPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleIPage');
  }
  agreed(){
    const modAg = this.modal.create('CalImpPage');
    modAg.present();
  }

}
