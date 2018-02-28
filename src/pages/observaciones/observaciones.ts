
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,ViewController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ObservacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-observaciones',
  templateUrl: 'observaciones.html',
  template: `
  <ion-content padding>
  <ion-card>
    <ion-card-content>
      <ion-item>
        <img src="../../assets/logo.png">
      </ion-item>
      <form (ngSubmit)="onSubmit()">
        <ion-item>
          <ion-label stacked>Ingrese Comentario</ion-label>
          <ion-textarea [(ngModel)]="payload" [ngModelOptions]="{standalone: true}"></ion-textarea>
        </ion-item>
        <ion-item>
          <button ion-button type="submit"  block round>Enviar</button>
        </ion-item>
      </form>
          
          </ion-card-content>
          </ion-card>
</ion-content>
<ion-footer>
<ion-toolbar>
  <button ion-button color="danger" block (click)="back()" round>Cancelar</button>
</ion-toolbar>
</ion-footer>
  `
})
export class ObservacionesPage {
  constructor( public navCtrl: NavController,
              public navParams: NavParams,
              public authService:AuthServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public viewCtrl :ViewController,
              ) {}
  payload: string;
  pl={}
  responseData: any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ObservacionesPage');
    console.log(this.navParams.get('id'));
    
  }
  chngrw(){
    console.log(this.payload);
  }
  back(){
    this.viewCtrl.dismiss();
  }
  onSubmit() {
    let alert = this.alertCtrl.create({
      title: 'Mensaje enviado',
      subTitle: 'El el mensaje se envio correctamente',
      buttons: ['Aceptar']
    });
    let errorm = this.alertCtrl.create({
      title: 'Ha ocurrido un error',
      subTitle: 'El servidor no ha respondido',
      buttons: ['Aceptar']
    });
     const loading = this.loadingCtrl.create({
      content: 'Enviando...',
      dismissOnPageChange: true
    });
    loading.present();
    if (this.navParams.get('id') ) {
      this.pl = {token: sessionStorage.getItem('token'),id: this.navParams.get('id'), response: this.payload, status: this.navParams.get('status')};
      console.log(this.pl);
      this.authService.loginCred(this.pl,'responseProcessClient?').then(
        (res) =>{
        this.responseData = res;
        loading.dismiss();
          if(this.responseData.responseCode == '0'){
            alert.present();
          }else{
            errorm.present();
          }
          this.viewCtrl.dismiss();
        },
        (error) => {
          loading.dismiss();
          errorm.present();
          this.viewCtrl.dismiss();
        }
      );
      // this.navCtrl.popToRoot();
    }else{
      loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ha ocurrido un error',
          subTitle: 'El servidor no ha respondido',
          buttons: ['Aceptar']
        });
        alert.present();
        this.viewCtrl.dismiss();
        // this.navCtrl.popToRoot();
    }
  }
}
