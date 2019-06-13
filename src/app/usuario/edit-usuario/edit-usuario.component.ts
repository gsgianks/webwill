import { Component, OnInit, Inject } from '@angular/core';
import { EditUsuarioService } from './edit-usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WhiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';

export interface DialogData{
  id: number;
}

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss'],
  providers: [EditUsuarioService]
})
export class EditUsuarioComponent implements OnInit {

  newUsuarioForm: FormGroup;
  usuario: Usuario;
  constructor(private service: EditUsuarioService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<Usuario>, @Inject(MAT_DIALOG_DATA) public data:DialogData ) { 
      this.usuarioRetrieved(data.id);
    }

  ngOnInit() {
    this.buildNewUsuarioForm();
  }

  buildNewUsuarioForm(): void{
    this.newUsuarioForm = this.fb.group({
      cedula: ['',[Validators.required, WhiteSpaceValidator.cannotContainSpace]],
      nombre: ['',[Validators.required]],
      apellidos: ['',[Validators.compose([Validators.required])]],
      correoElectronico: ['',[Validators.compose([Validators.required,WhiteSpaceValidator.cannotContainSpace])]],
      telefono: ['',[Validators.compose([Validators.required,WhiteSpaceValidator.cannotContainSpace])]],
      telefonoCelular: ['',[Validators.compose([Validators.required,WhiteSpaceValidator.cannotContainSpace])]],
      direccion: ['',[Validators.required]]
    });
  }

  usuarioRetrieved(id: number): void{
    this.service.getUsuarioById(id)
      .subscribe(response =>{
        this.usuario = response;
        this.newUsuarioForm.patchValue({
          cedula: response.cedula,
          nombre: response.nombre,
          apellidos: response.apellidos,
          correoElectronico: response.correoElectronico,
          telefono: response.telefono,
          telefonoCelular: response.telefonoCelular,
          direccion: response.direccion
        });
      })
  }

  save(): void{
    
    if(this.newUsuarioForm.dirty && this.newUsuarioForm.valid){
      const p = Object.assign({}, this.usuario, this.newUsuarioForm.value);
      this.service.editUsuario(p)
        .subscribe(response => {
          this.dialogRef.close();
        });
    }else if(!this.newUsuarioForm.dirty){
      this.newUsuarioForm.reset();
    }
  }
}
