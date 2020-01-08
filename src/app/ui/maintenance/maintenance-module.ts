import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MaintenanceRoutingModule } from './maintenance.routing-module';
import { AgGridModule } from 'ag-grid-angular';
import * as MaintenanceComponents from '.';
import { ReceivingSheetRoutingModule } from '../receivingsheet/receivingsheet-routing.module';

@NgModule({
  declarations: [
    MaintenanceComponents.MaintenanceEditComponent,
    MaintenanceComponents.MaintenanceDisplayComponent,
    MaintenanceComponents.MaintenanceGridComponent,
    MaintenanceComponents.MaintenanceViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    ReceivingSheetRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    MaintenanceComponents.MaintenanceEditComponent,
    MaintenanceComponents.MaintenanceDisplayComponent
  ],
  exports: []
})
export class ReceivingSheetModule { }
