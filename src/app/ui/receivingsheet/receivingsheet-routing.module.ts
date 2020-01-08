import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReceivingSheetGridComponent } from './receivingsheet-grid/receivingsheet-grid.component';
import { AuthGuard } from '../../auth/auth.guard';
import { Role } from '../../domain/role.enum';
import { ReceivingSheetEditComponent } from './receivingsheet-edit/receivingsheet-edit.component';

import * as ReceivingSheetComponents from '.';

const receivingsheetRoutes: Routes = [
  {
    path: '',
    component: ReceivingSheetComponents.ReceivingSheetViewComponent
  },
  {
    path: ':id',
    component: ReceivingSheetComponents.ReceivingSheetDisplayComponent
  },
  {
    path: 'edit/:id',
    component: ReceivingSheetComponents.ReceivingSheetEditComponent
  },
  {
    path: 'edit/:id/:origen/:idMoto',
    component: ReceivingSheetComponents.ReceivingSheetEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(receivingsheetRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ReceivingSheetRoutingModule { }
