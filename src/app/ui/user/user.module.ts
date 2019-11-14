import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './user.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { MotorcycleModule } from '../motorcycle/motorcycle.module';

@NgModule({
  declarations: [
    UserViewComponent,
    UserEditComponent,
    UserComponent,
    UserGridComponent,
    UserDisplayComponent
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
    UserEditComponent,
    UserDisplayComponent
  ]
})
export class UserModule { }
