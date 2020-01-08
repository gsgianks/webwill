import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MotorcycleGridComponent } from './Motorcycle-grid/Motorcycle-grid.component';
import { AuthGuard } from '../../auth/auth.guard';
import { Role } from '../../domain/role.enum';
import { MotorcycleEditComponent } from './Motorcycle-edit/Motorcycle-edit.component';

import * as MotorcycleComponents from '.';

const motorcycleRoutes: Routes = [
  {
    path: '',
    component: MotorcycleComponents.MotorcycleViewComponent
  },
  {
    path: ':id',
    component: MotorcycleComponents.MotorcycleDisplayComponent
  },
  {
    path: 'edit/:id',
    component: MotorcycleComponents.MotorcycleEditComponent
  },
  {
    path: 'edit/:id/:origen/:idUsuario',
    component: MotorcycleComponents.MotorcycleEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(motorcycleRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MotorcycleRoutingModule { }
