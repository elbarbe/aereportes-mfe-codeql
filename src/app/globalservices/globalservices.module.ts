import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GlobalServicesRoutingModule } from './globalservices-routing.module';
import { GSSIUuTGENFILELEGALIZACOMComponent } from './siu_tgenfilelegalizacom.component';
import { GSSIUuTGENFILELEGALIZACOMuOutComponent } from './siu_tgenfilelegalizacom_out.component';
import { GSSIUuREACTIVACIONCONTRATOSComponent } from './siu_reactivacioncontratos.component';
import { GSSIUuTGENREPALMComponent } from './siu_tgenrepalm.component';
import { GSSIUuTGENREPALMuOutComponent } from './siu_tgenrepalm_out.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GlobalServicesRoutingModule
  ],
  declarations: [
    GSSIUuTGENFILELEGALIZACOMComponent,
    GSSIUuTGENFILELEGALIZACOMuOutComponent,
    GSSIUuREACTIVACIONCONTRATOSComponent,
    GSSIUuTGENREPALMComponent,
    GSSIUuTGENREPALMuOutComponent
  ],
  exports: [
    GSSIUuTGENFILELEGALIZACOMComponent,
    GSSIUuTGENFILELEGALIZACOMuOutComponent,
    GSSIUuREACTIVACIONCONTRATOSComponent,
    GSSIUuTGENREPALMComponent,
    GSSIUuTGENREPALMuOutComponent
  ]
})
export class GlobalServicesModule { }
