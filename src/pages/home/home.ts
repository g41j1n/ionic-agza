import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  console.log(JSON.parse(sessionStorage.getItem('companies')));
  console.log(sessionStorage.getItem('token'));
  
  
  }

}
