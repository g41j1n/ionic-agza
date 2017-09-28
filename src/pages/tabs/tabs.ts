import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';



import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';
const jobNumber = '5555555';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  //tab2Root = AboutPage;
  //tab3Root = ContactPage;
  tab0Root = ChatPage;

  constructor() {}

};
export class Calltab {
  constructor(private callNumber: CallNumber) {
    
      }
      onCall(){
        this.callNumber.callNumber(jobNumber, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
      }
};
export class BroTab {
  constructor(private theInAppBrowser: InAppBrowser) {
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
}
