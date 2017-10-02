import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';


/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  responseData : any;
  userData={"email":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public authService: AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
  resetmail(){
    let type = 'recoverypassword?';
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.authService.resetPass(this.userData,type).then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.responseCode == 0) {
        // crear animacion de carga
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Contraseña Restaurada',
          subTitle: 'La nueva contraseña se ha enviado a su correo',
          buttons: ['Aceptar']
        });
        alert.present();
        this.navCtrl.popToRoot();
      } else {
        /*         crear animacion de carga
        limpiar campos
      */
      loading.dismiss();
      
      let alert = this.alertCtrl.create({
        title: 'Verifique su correo',
        subTitle: 'El correo proporcionado no se encuentra en el sistema',
        buttons: ['Aceptar']
      });
      alert.present();
         }    
    });
  }
  goback(){
    this.navCtrl.popToRoot();
   
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
