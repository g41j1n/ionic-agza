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
    this.pl = {token: sessionStorage.getItem('token'),id: this.idPro};
    this.authService.loginCred(this.pl,'oFEmpresa?')
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
