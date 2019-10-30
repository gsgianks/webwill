import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleViewComponent } from './motorcycle-view/Motorcycle-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MotorcycleRoutingModule } from './motorcycle-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { MotorcycleEditComponent } from './motorcycle-edit/Motorcycle-edit.component';
import { MotorcycleGridComponent } from './motorcycle-grid/Motorcycle-grid.component';
import { MotorcycleDisplayComponent } from './motorcycle-display/Motorcycle-display.component';

@NgModule({
  declarations: [
    MotorcycleViewComponent,
    MotorcycleEditComponent,
    MotorcycleGridComponent,
    MotorcycleDisplayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    MotorcycleRoutingModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    MotorcycleEditComponent,
    MotorcycleDisplayComponent
  ]
})
export class MotorcycleModule { }
