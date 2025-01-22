import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopStateNavigationGuard } from '../common/popStateNavigationGuard';
import { LoginGuard } from '../common/loginGuard';
import { UsuarioPIUuUsuariosPolInternacionalComponent } from './piu_usuariospolinternacional.component';

const routes: Routes = [
    { path: 'piu_usuariospolinternacional' , component: UsuarioPIUuUsuariosPolInternacionalComponent,
        canActivate: [LoginGuard], canDeactivate: [PopStateNavigationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
