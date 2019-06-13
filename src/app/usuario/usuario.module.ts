import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NewUsuarioComponent } from './new-usuario/new-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsUsuarioComponent } from './details-usuario/details-usuario.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    MaterialModule
  ],
  declarations: [UsuarioListComponent, NewUsuarioComponent, EditUsuarioComponent, DetailsUsuarioComponent], 
  entryComponents:[NewUsuarioComponent, EditUsuarioComponent, DetailsUsuarioComponent]
})
export class UsuarioModule { }
