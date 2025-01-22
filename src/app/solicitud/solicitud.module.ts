import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SolicitudPIUuRadicadosuObsComponent } from './piu_radicados_obs.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SolicitudRoutingModule
  ],
  declarations: [
    SolicitudPIUuRadicadosuObsComponent
  ],
  exports: [
    SolicitudPIUuRadicadosuObsComponent
  ]
})
export class SolicitudModule { }
