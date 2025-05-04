import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GlobalServicesRoutingModule } from './globalservices-routing.module';
import { GSSIUuTGENFILELEGALIZACOMComponent } from './siu_tgenfilelegalizacom.component';
import { GSSIUuTGENFILELEGALIZACOMuOutComponent } from './siu_tgenfilelegalizacom_out.component';
import { GSSIUuTGDUMMYGDC27u1Component } from './siu_tgdummygdc27_1.component';
import { GSSIUuTGDUMMYGDC27u1uOutComponent } from './siu_tgdummygdc27_1_out.component';
import { GSSIUuOGETREPORTSOLComponent } from './siu_ogetreportsol.component';
import { GSSIUuOGETREPORTSOLuOutComponent } from './siu_ogetreportsol_out.component';
import { GSSIUuOGETREPORTSOLNOVComponent } from './siu_ogetreportsolnov.component';
import { GSSIUuOGETREPORTSOLNOVuOutComponent } from './siu_ogetreportsolnov_out.component';
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
    GSSIUuTGDUMMYGDC27u1Component,
    GSSIUuTGDUMMYGDC27u1uOutComponent,
    GSSIUuOGETREPORTSOLComponent,
    GSSIUuOGETREPORTSOLuOutComponent,
    GSSIUuOGETREPORTSOLNOVComponent,
    GSSIUuOGETREPORTSOLNOVuOutComponent,
    GSSIUuTGENREPALMComponent,
    GSSIUuTGENREPALMuOutComponent
  ],
  exports: [
    GSSIUuTGENFILELEGALIZACOMComponent,
    GSSIUuTGENFILELEGALIZACOMuOutComponent,
    GSSIUuTGDUMMYGDC27u1Component,
    GSSIUuTGDUMMYGDC27u1uOutComponent,
    GSSIUuOGETREPORTSOLComponent,
    GSSIUuOGETREPORTSOLuOutComponent,
    GSSIUuOGETREPORTSOLNOVComponent,
    GSSIUuOGETREPORTSOLNOVuOutComponent,
    GSSIUuTGENREPALMComponent,
    GSSIUuTGENREPALMuOutComponent
  ]
})
export class GlobalServicesModule { }
