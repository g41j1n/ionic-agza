import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalImpPage } from './cal-imp';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    CalImpPage,
  ],
  imports: [
    IonicPageModule.forChild(CalImpPage),
    Ionic2RatingModule
  ],
})
export class CalImpPageModule {}
