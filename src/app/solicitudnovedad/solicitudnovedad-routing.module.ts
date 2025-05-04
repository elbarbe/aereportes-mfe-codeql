import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopStateNavigationGuard } from '../common/popStateNavigationGuard';
import { LoginGuard } from '../common/loginGuard';
import { SolicitudNovedadPIUuSolicitudNovedaduNullComponent } from './piu_solicitudnovedad_null.component';

const routes: Routes = [
    { path: 'piu_solicitudnovedad_null' , component: SolicitudNovedadPIUuSolicitudNovedaduNullComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudNovedadRoutingModule { }
