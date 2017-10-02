import { Component } from '@angular/core';
import { NavController, List } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCompanies:any;
  constructor(public navCtrl: NavController) {
    this.listCompanies = JSON.parse(sessionStorage.getItem('companies'));
    // this.companies();
    
  }
  gotoEvent(id){
    console.log(id);
    
  }


}
