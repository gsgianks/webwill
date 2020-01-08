import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleViewComponent } from './motorcycle-view/Motorcycle-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MotorcycleRoutingModule } from './motorcycle-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import * as MotorcycleComponents from '.';

@NgModule({
  declarations: [
    MotorcycleComponents.MotorcycleViewComponent,
    MotorcycleComponents.MotorcycleEditComponent,
    MotorcycleComponents.MotorcycleGridComponent,
    MotorcycleComponents.MotorcycleDisplayComponent,
    MotorcycleComponents.MotorcycleListUserComponent
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
    MotorcycleComponents.MotorcycleEditComponent,
    MotorcycleComponents.MotorcycleDisplayComponent
  ],
  exports: [
    MotorcycleComponents.MotorcycleListUserComponent
  ]
})
export class MotorcycleModule { }
