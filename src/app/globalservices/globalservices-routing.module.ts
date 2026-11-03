import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopStateNavigationGuard } from '../common/popStateNavigationGuard';
import { LoginGuard } from '../common/loginGuard';
import { GSSIUuTGENFILELEGALIZACOMComponent } from './siu_tgenfilelegalizacom.component';
import { GSSIUuTGENFILELEGALIZACOMuOutComponent } from './siu_tgenfilelegalizacom_out.component';
import { GSSIUuREACTIVACIONCONTRATOSComponent } from './siu_reactivacioncontratos.component';
import { GSSIUuTGENREPALMComponent } from './siu_tgenrepalm.component';
import { GSSIUuTGENREPALMuOutComponent } from './siu_tgenrepalm_out.component';

const routes: Routes = [
    { path: 'siu_tgenfilelegalizacom' , component: GSSIUuTGENFILELEGALIZACOMComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_tgenfilelegalizacom_out' , component: GSSIUuTGENFILELEGALIZACOMuOutComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_reactivacioncontratos' , component: GSSIUuREACTIVACIONCONTRATOSComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_tgenrepalm' , component: GSSIUuTGENREPALMComponent, canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] },
    { path: 'siu_tgenrepalm_out' , component: GSSIUuTGENREPALMuOutComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalServicesRoutingModule { }
