import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData={"email":"","password":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    const loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    console.log(this.userData);
    
     this.authService.loginCred(this.userData,'loginApp?').then((result) =>{
      this.responseData = result;
      let auth = this.responseData.responseCode;
      console.log(this.responseData);
      if (auth == 0 || auth == '00' || auth == '0') {
        loading.dismiss();
        console.log(this.responseData.responseCode);
        // guardar los datos en dos variables distintas usuario y empresas
        // console.log(this.responseData.name);
        // console.log(this.responseData.listCompanies);
        // console.log(this.responseData.token);
        
        sessionStorage.setItem('name',this.responseData.name);
        sessionStorage.setItem('companies', JSON.stringify(this.responseData.listCompanies));
        sessionStorage.setItem('token', this.responseData.token);
        sessionStorage.setItem('email', this.responseData.email);
        this.navCtrl.push(TabsPage);
        
      } else {
        // clear forms
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Acceso Denegado',
          subTitle: 'El usuario y/o contraseña son invalidos',
          buttons: ['Aceptar']
        });
        alert.present();

      }
    });
  }
  reset(){
    this.navCtrl.push(ResetPage);
  }


}
