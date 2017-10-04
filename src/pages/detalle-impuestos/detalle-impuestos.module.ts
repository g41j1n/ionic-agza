import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleImpuestosPage } from './detalle-impuestos';

@NgModule({
  declarations: [
    DetalleImpuestosPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleImpuestosPage),
  ],
})
export class DetalleImpuestosPageModule {
}
