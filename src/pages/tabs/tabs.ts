import { Component } from '@angular/core';
import { ModalController,LoadingController,AlertController,NavController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';

let jobNum: string = '555555';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab0Root = ChatPage;
  responseData : any;
  userData={"token":sessionStorage.getItem('token')};

  constructor(public navCtrl: NavController,private callNumber: CallNumber,private theInAppBrowser: InAppBrowser, private modal: ModalController, public authService:AuthServiceProvider,public alertCtrl: AlertController, public loadingCtrl: LoadingController ) {

  }
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target);
  }
  public openWithInAppBrowser(url : string){
      let target = "_blank";
      this.theInAppBrowser.create(url,target);
  }
  public openWithCordovaBrowser(url : string){
      let target = "_self";
      this.theInAppBrowser.create(url,target);
  }  
  ionViewDidLoad() {
    
  }
  logout(){
    console.log('log out');
    console.log(this.userData + 'closeSession?');
    const loading = this.loadingCtrl.create({
      content: 'Cerrando Sesión...'
    });
    loading.present();
    this.authService.loginCred(this.userData ,'closeSession?').then((result) =>{
      this.responseData = result;
      let auth = this.responseData.responseCode;
      console.log(this.responseData.responseCode);
      if (auth == 0 || auth == '00') {
        loading.dismiss();
        this.navCtrl.popToRoot();
      }else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ha habido un error al cerrar sesión',
          buttons: ['Aceptar']
        });
        alert.present();
      };
    });    
    
  }
  changepass(){
    const passMod = this.modal.create('ModPassPage');
    passMod.present();
  }
  call(){
    console.log('llamada');
    this.callNumber.callNumber(jobNum,true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
    
  }
}
