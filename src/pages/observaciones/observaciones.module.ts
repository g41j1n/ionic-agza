import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObservacionesPage } from './observaciones';
import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    ObservacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ObservacionesPage),
  ],
})
export class ObservacionesPageModule {}
