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
  idE:any; 

  /* 
  retoma los datos almacenados en sessionStorage y modifica el numero de mes en los periodos por el nombre 
  */
  constructor(public navCtrl: NavController, public navParams: NavParams,private modal: ModalController, public service:AuthServiceProvider,public alertCtrl: AlertController) {
    
  this.period = this.navParams.data.periods;
  this.process = this.navParams.data.process;
  this.meses=['','Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  this.period.forEach(element => {
    var d = element.periodo;
    var y= d.slice(0,4);
    var m= d.slice(4);
    m= m.replace(/^0/g, '')
    element.periodo = y+' - '+ this.meses[m] ;
    this.idE= this.process[0].idEmpresa;
    
  });
    
  }

  ionViewDidLoad() {
    console.log(this.period);
    
  }

  /* 
  toma el evento de seleccion del periodo y lo envia a la función refresh
  */
  onSelectChange(sel){
    this.refresh(this.idE,sel);
  }

  /* 
  toma el id del idempresaproceso y lo envia a la pagina detalle-i
  */
  detail(id){
    console.log('detalle'+id);
    this.navCtrl.push('DetalleIPage',{id: id});
  }

  /* 
   genera un modal con un formulario de calificación
  */
  obs(id){
    console.log('observaciones'+id);
    
    const detMod = this.modal.create('ObservacionesPage');
    detMod.present();

  }

  /* 
   toma el id del periodo y el id de la empresa para solicitar los procesos de esa empresa
  */
  refresh(id,tm){
    let pl= {'idE':id,'period':tm};
    console.log(pl);
    this.service.loginCred(pl,'oProcesoEmpresa?').then(r =>{
      console.log(r);
      this.process = 
      r['listProcess']

    }).catch(e =>{
      let alert = this.alertCtrl.create({
        title: 'Conexion interrumpida',
        subTitle: 'no se ha podido conectar con el servidor',
        buttons: ['Aceptar']
      });
      alert.present();
      
    });
    
  };
  detailP(id){
    console.log(id);
  };
}
