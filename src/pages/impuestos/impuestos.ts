import { Component } from '@angular/core';
import { IonicPage, ModalController,LoadingController,AlertController,NavController,NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ObservacionesPage } from '../observaciones/observaciones';



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
  period: any;
  process: any;
  meses:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private modal: ModalController) {
    
   this.period = this.navParams.data.periods;
  this.process = this.navParams.data.process;
  this.meses=['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  this.period.forEach(element => {
    var d = element.periodo;
    var y= d.slice(0,4);
    var m= d.slice(4);
    m= m.replace(/^0/g, '')
    element.periodo = y+' - '+ this.meses[m] ;
  });
    
  }

  ionViewDidLoad() {
    console.log(this.process);
    console.log(this.period);
    
  }
  onSelectChange(selected){
    console.log('foo');
    
    console.log(selected);
  }
  detail(id){
    console.log('detalle'+id);
    this.navCtrl.push('DetalleIPage');
  }
  obs(id){
    console.log('observaciones'+id);
    
    const detMod = this.modal.create('ObservacionesPage');
    detMod.present();

  }
}
