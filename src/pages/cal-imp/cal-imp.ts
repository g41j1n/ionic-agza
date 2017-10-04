import { Component, NgModule } from '@angular/core';
import { IonicModule, IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalImpPage');
  }

}
