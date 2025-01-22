import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioPIUuUsuariosPolInternacionalComponent } from './piu_usuariospolinternacional.component';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    UsuarioRoutingModule
  ],
  declarations: [
    UsuarioPIUuUsuariosPolInternacionalComponent
  ],
  exports: [
    UsuarioPIUuUsuariosPolInternacionalComponent
  ]
})
export class UsuarioModule { }
