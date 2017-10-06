import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, List } from 'ionic-angular';
import { ImpuestosPage } from '../impuestos/impuestos';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCompanies:any;
  pl:any;
  responseData:any;
  
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public loading:LoadingController, public alertCtrl: AlertController ) {
    this.listCompanies = JSON.parse(sessionStorage.getItem('companies'));
    // this.companies();
    
  }
  gotoEvent(id){
    const loading = this.loading.create({
      content: 'Buscando...'
    });
    loading.present();
    let tk = sessionStorage.getItem('token');
    this.pl={'token': tk,'idCompany':id};
    console.log(this.pl);
    this.authService.loginCred(this.pl,'consultPeriods?').then((result) =>{
      this.responseData = result;
      let auth = this.responseData.responseCode;
      loading.dismiss();
      console.log(auth);
      
      if (auth === 0 || auth === '00' || auth === '0') {
        console.log(this.responseData.listPeriods);
        this.navCtrl.push(ImpuestosPage,this.responseData.listPeriods);
      }else{
        let alert = this.alertCtrl.create({
          title: 'Ha habido un error en la consulta',
          subTitle: 'Vuelva a intentarlo o pongase en contacto con soporte tecnico',
          buttons: ['Aceptar']
        });
        alert.present();
      }
      if (auth === 1 || auth === '1') {
        let alert = this.alertCtrl.create({
          title: 'No se pudo completar',
          subTitle: this.responseData.message,
          buttons: ['Aceptar']
        });
          alert.present();
        }
    }, (err) => {
      console.log(err);
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'No se pudo completar',
        subTitle: 'Error:  '+err.status+' , '+err.statusText,
        buttons: ['Aceptar']
      });
      alert.present();
      
    } );
    
    
  }


}
