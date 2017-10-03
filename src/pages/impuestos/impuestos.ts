import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImpuestosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impuestos',
  templateUrl: 'impuestos.html',
})
export class ImpuestosPage {
  idE: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.idE = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log(this.idE);
  }
  onSelectChange(selected){
    console.log('foo');
    
    console.log(selected);
  }

}
