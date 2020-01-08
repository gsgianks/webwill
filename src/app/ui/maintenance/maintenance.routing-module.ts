import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceGridComponent } from './maintenance-grid/maintenance-grid.component';
import { AuthGuard } from '../../auth/auth.guard';
import { Role } from '../../domain/role.enum';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';

import * as maintenanceComponents from '.';

const maintenanceRoutes: Routes = [
  {
    path: '',
    component: maintenanceComponents.MaintenanceViewComponent
  },
  {
    path: ':id',
    component: maintenanceComponents.MaintenanceDisplayComponent
  },
  {
    path: 'edit/:id',
    component: maintenanceComponents.MaintenanceEditComponent
  },
  {
    path: 'edit/:id/:origen/:idMoto',
    component: maintenanceComponents.MaintenanceEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(maintenanceRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MaintenanceRoutingModule { }
