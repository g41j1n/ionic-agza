import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, List } from 'ionic-angular';
import { ImpuestosPage } from '../impuestos/impuestos';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCompanies:any;
  pl:any;
  responseData:any;
  count :any;
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public loading:LoadingController, public alertCtrl: AlertController ) {
    this.listCompanies = JSON.parse(sessionStorage.getItem('companies'));
    this.count = Object.keys(this.listCompanies).length;
    // this.companies();
    if (this.count == 1) {
      this.gotoEvent(this.listCompanies[0].idEmpresaUsuario);
    }
    
  }
  async gotoEvent(id){
    console.log(id);
    let pld = {'idE': id,'period':1};
    let tk = sessionStorage.getItem('token');
    this.pl={'token': tk,'idCompany':id};
    const est = await this.authService.loginCred(pld,'oProcesoEmpresa?');
    
    const prd = await this.authService.loginCred(this.pl,'oEmpPer?')
    // console.log(prd['periods']);
    
    let data:any ={'process':est['listProcess'],'periods':prd['periods']}
    this.navCtrl.push(ImpuestosPage,data);
    
    
    
  }
    


}
