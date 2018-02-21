import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
const urlM = "http://192.168.0.22/SISV1/index.php/Agzapp/";
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
  }
  /*
    funcion para login. toma las credenciales desde un form
    generando una url para hacer el request
   */
   loginCred(credentials,type){
    let urlParameters = Object.keys(credentials).map((i) => i+'='+credentials[i]).join('&')
    
    return new Promise((resolve,reject) =>{
       this.http.get(urlM + type + urlParameters).subscribe(res => {
        resolve( res.json());
      },(err) =>{
        reject(err);
      });
    });
  }
  /* 
    genera la url para con el correo al que se le generara la contraseña temporal

  */
  resetPass(mail,type){
    return new Promise ( (resolve,reject) => {
      let urlParameters = Object.keys(mail).map((i) => i+'='+mail[i]).join('&')
      console.log( urlM + type +urlParameters);
      
      this.http.get( urlM + type +urlParameters).subscribe( res =>{
        resolve(res.json());
      },(err) =>{
        reject(err);
      });
    });
  }

  /* 
   request para aceptar o cancelar el proceso seleccionado
  */
  processReview(data) {
    // console.log(data);
    return new Promise ( (resolve,reject) => {
      let urlParameters = 'token='+sessionStorage.getItem('token')+'&idProcess='+ data.id+ '&status='+ data.status+'&response='+data.response;
      // console.log( urlM + '' +urlParameters);
      this.http.get( urlM + 'validateAdvance?' +urlParameters).subscribe( res =>{
        resolve(res.json());
      },(err) =>{
        reject(err);
      });
    });


  }
}
