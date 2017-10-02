import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
const urlM = "http://192.168.0.22/SISV1/index.php/Agzapp/";
// const urlM = "http://192.168.0.22/SISV1/index.php/Agzapp/LoginApp?email=e@e.com&password=1";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }
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
 
}
