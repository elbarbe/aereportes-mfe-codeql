import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SolicitudNovedadRoutingModule } from './solicitudnovedad-routing.module';
import { SolicitudNovedadPIUuSolicitudNovedaduNullComponent } from './piu_solicitudnovedad_null.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SolicitudNovedadRoutingModule
  ],
  declarations: [
    SolicitudNovedadPIUuSolicitudNovedaduNullComponent
  ],
  exports: [
    SolicitudNovedadPIUuSolicitudNovedaduNullComponent
  ]
})
export class SolicitudNovedadModule { }
