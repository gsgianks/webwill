import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';

const usuarioRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component : UsuarioListComponent
      }
    ],
    canActivate: [AuthGuard],
    data: {
      expectedRole:Role.AdminSupplier
    }
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usuarioRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class UsuarioRoutingModule { }
