import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ResetPage } from '../reset/reset';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  userData={"email":"","password":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
     this.authService.loginCred(this.userData,'loginApp?').then((result) =>{
      this.responseData = result;
      let auth = this.responseData.responseCode;
      console.log(this.responseData);
      if (auth == 0 || auth == 0) {
        console.log(this.responseData.responseCode);
        sessionStorage.setItem('loginData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
        
      } else {
        // clear forms

      }
    });
  }
  reset(){
    this.navCtrl.push(ResetPage);
  }


}
