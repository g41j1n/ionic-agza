import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ModalController,AlertController } from 'ionic-angular';

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
datos: any;

pl:{};
responseData: any;
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public modal: ModalController,
               public authService:AuthServiceProvider,
               public loadingCtrl: LoadingController,
               public modalCtrl: ModalController,
               public alertCtrl: AlertController ) {
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetalleIPage');
    this.idPro = this.navParams.get('id');
    this.pl = {token: sessionStorage.getItem('token'),idE: this.idPro};
    this.authService.loginCred(this.pl,'oFEmpresa?').then(
      (res) => {
        this.responseData = res;
      let auth = this.responseData.responseCode;
      let detail = this.responseData.processDetail;
      if ((auth === 0 || auth === '00' || auth === '0') && (detail.length >0 || detail !== undefined)) {
        // status : "C"
        // estatusImp : ""
        // fecha : "2017-09-15 00:00:00"
        // idEmpresa : "1"
        // idEmpresasProcesosPeriodos : "12"
        // idPeriodo : "1"
        // idProceso1 : "0"
        // idProcesos : "14"
        // importe : "0.0000"
        // observaciones : "observaciones"
        // porcesos : "Impuestos de seguridad social" 
        // proceso1 : null
        // proceso2 : null
        // proceso3 : null
        // proceso4 : null
        // this.datos.estatus=detail[0].estatus;
        this.datos ={estatus: detail[0].estatus,
          estatusImp:detail[0].estatusImp,
          fecha:detail[0].fecha,
          idEmpresa:detail[0].idEmpresa,
          idEmpresasProcesosPeriodos:detail[0].idEmpresasProcesosPeriodos,
          idPeriodo:detail[0].idPeriodo,
          idProceso:detail[0].idProceso1,
          proceso:detail[0].porcesos,
          subproceso1:detail[0].proceso1,
          subproceso2:detail[0].proceso2,
          subproceso3:detail[0].proceso3,
          subproceso4:detail[0].proceso4,
          comentario:detail[0].observaciones,
          total:detail[0].importe
        };
        console.log(this.datos);
      }
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.idPro);

  }
  agreed() {
    const modAg = this.modal.create('CalImpPage');
    modAg.present();
  }
  onCancel() {
    this.status= false ;
    this.pl = {id: this.idPro, response: this.response, status: this.status};
    const detMod = this.modal.create('ObservacionesPage',this.pl);
    detMod.present();
  }
  
  onAccept() {
    this.status= true;
    this.response= '';
    this.onSubmit();
    
  }
  onSubmit() {
    const loading = this.loadingCtrl.create({
      content: 'Enviando...',
      dismissOnPageChange: true
    });
    loading.present();
    let alert = this.alertCtrl.create({
      title: 'Mensaje enviado',
      subTitle: 'El el mensaje se envio correctamente',
      buttons: ['Aceptar']
    });
    let errorm = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      subTitle: 'El servidor no ha respondido',
      buttons: ['Aceptar']
    });
    this.pl = {token: sessionStorage.getItem('token'),id: this.idPro, response: this.response, status: this.status};
    this.authService.loginCred(this.pl,'responseProcessClient?').then(
      (res) => {
        this.responseData = res;
        if(this.responseData.responseCode == '0'){
          loading.dismiss();
          alert.present();
        }else{
          loading.dismiss();
          errorm.present();
        }
        this.navCtrl.popToRoot();
       
        
      },
      (error) => {
        loading.dismiss();
        errorm.present();
        this.navCtrl.popToRoot();
      }
    );
    // this.navCtrl.popToRoot();
  }
}
