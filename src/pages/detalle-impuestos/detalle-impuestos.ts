import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the DetalleImpuestosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-impuestos',
  templateUrl: 'detalle-impuestos.html',
})
export class DetalleImpuestosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleImpuestosPage');
  }
  agreed(){
    const modAg = this.modal.create('CalImpPage');
    modAg.present();
  }

}
