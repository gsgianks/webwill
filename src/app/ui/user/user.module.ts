import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { UserComponent } from './user.component';
import { MotorcycleModule } from '../motorcycle/motorcycle.module';
import * as UserComponents from '.';

@NgModule({
  declarations: [
    UserComponents.UserViewComponent,
    UserComponents.UserEditComponent,
    UserComponents.UserGridComponent,
    UserComponents.UserDisplayComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    UserRoutingModule,
    MotorcycleModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [
    UserComponents.UserEditComponent,
    UserComponents.UserDisplayComponent
  ]
})
export class UserModule { }
