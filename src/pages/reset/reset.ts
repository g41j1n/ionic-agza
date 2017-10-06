import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
  private reset : FormGroup;
  private login : FormGroup;
  responseData : any;
  userData={"email":""};
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public app: App, public authService: AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
   this.reset = this.formBuilder.group({
    email:['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
   });
  }
  resetmail(){
    let type = 'recoverypassword?';
    const loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });
    loading.present();
    console.log(this.reset.value);
    
    this.authService.resetPass(this.reset.value,type).then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      this.reset.reset();
      if (this.responseData.responseCode == 0) {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Contraseña Reiniciada',
          subTitle: 'La nueva contraseña se ha enviado a su correo',
          buttons: ['Aceptar']
        });
        alert.present();
        this.navCtrl.popToRoot();
      } else {
       
      loading.dismiss();
      
      let alert = this.alertCtrl.create({
        title: 'Verifique su correo',
        subTitle: 'El correo proporcionado no se encuentra en el sistema',
        buttons: ['Aceptar']
      });
      alert.present();
         }    
    }, (err) =>{
      console.log(err);
      loading.dismiss();
      
    });
  }
  goback(){
    this.navCtrl.popToRoot();
   
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
