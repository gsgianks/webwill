import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReceivingSheetRoutingModule } from './receivingsheet-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import * as ReceivingSheetComponents from '.';
// import { ReceivingsheetListUserComponent } from './Receivingsheet-list-user/Receivingsheet-list-user.component';

@NgModule({
  declarations: [
    ReceivingSheetComponents.ReceivingSheetViewComponent,
    ReceivingSheetComponents.ReceivingSheetEditComponent,
    ReceivingSheetComponents.ReceivingSheetGridComponent,
    ReceivingSheetComponents.ReceivingSheetDisplayComponent,
    // ReceivingsheetListUserComponent
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
    ReceivingSheetComponents.ReceivingSheetEditComponent,
    ReceivingSheetComponents.ReceivingSheetDisplayComponent
  ],
  exports: [
    // ReceivingsheetListUserComponent
  ]
})
export class ReceivingSheetModule { }
