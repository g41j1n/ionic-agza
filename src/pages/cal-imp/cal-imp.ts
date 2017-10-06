import { Component, NgModule } from '@angular/core';
import { IonicModule, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CalImpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-cal-imp',
  templateUrl: 'cal-imp.html',
})
export class CalImpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
  payload={}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalImpPage');
  }
  chngrw(){
    console.log(this.payload);
  }
  back(){
    this.viewCtrl.dismiss();
  }

}
