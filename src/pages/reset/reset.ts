import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {LoginPage} from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }
  resetmail(){
    this.navCtrl.popToRoot();
  }
  goback(){
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

}
