import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { UserComponent } from './user.component';
import { MotorcycleModule } from '../motorcycle/motorcycle.module';
import * as UserComponents from '.';
import { UserTableComponent } from './user-table/user-table.component';
import { ConfirmationDialogService } from '../shared/confirmation-dialog/confirmation-dialog.service';

@NgModule({
  declarations: [
    UserComponents.UserViewComponent,
    UserComponents.UserEditComponent,
    UserComponents.UserDisplayComponent,
    UserComponents.UserTableComponent,
    UserComponent,
    UserTableComponent
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
  ],
  providers: [
    ConfirmationDialogService
  ]
})
export class UserModule { }
