import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImpuestosPage } from './impuestos';

@NgModule({
  declarations: [
    ImpuestosPage,
  ],
  imports: [
    IonicPageModule.forChild(ImpuestosPage),
  ],
})
export class ImpuestosPageModule {}
