import { Component } from '@angular/core';
import { IonicPage, ModalController,LoadingController,AlertController,NavController,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DetalleImpuestosPage } from '../detalle-impuestos/detalle-impuestos';


/**
 * Generated class for the ImpuestosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impuestos',
  templateUrl: 'impuestos.html',
})
export class ImpuestosPage {
  idE: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private modal: ModalController) {
    
    this.idE = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log(this.idE);
  }
  onSelectChange(selected){
    console.log('foo');
    
    console.log(selected);
  }
  detail(){
    console.log('detalle');
    this.navCtrl.push('DetalleIPage');
  }
  obs(){
    const detMod = this.modal.create('ObservacionesPage');
    detMod.present();

  }
}
