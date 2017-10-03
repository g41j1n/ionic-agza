import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPage } from '../pages/reset/reset';
import { ChatPage } from '../pages/chat/chat';
import { ImpuestosPage } from '../pages/impuestos/impuestos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ServServiceProvider } from '../providers/serv-service/serv-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ResetPage,
    ChatPage,
    ImpuestosPage,
    TabsPage
  ],
  imports: [
    BrowserModule,HttpModule,    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ResetPage,
    ChatPage,
    ImpuestosPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    CallNumber,
    InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ServServiceProvider
  ]
})
export class AppModule {}
