import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { WhiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';
import { NewUsuarioService } from './new-usuario.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.scss'],
  providers: [NewUsuarioService]
})
export class NewUsuarioComponent implements OnInit {

  newUsuarioForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder, private service: NewUsuarioService,
    public dialogRef:MatDialogRef<NewUsuarioComponent>) { }

  ngOnInit() {
    this.buildNewUsuarioForm();
  }

  save(): void{
    
    if(this.newUsuarioForm.dirty && this.newUsuarioForm.valid){
      const p = Object.assign({}, this.usuario, this.newUsuarioForm.value);
      this.service.saveUsuario(p)
        .subscribe(response => {
          this.dialogRef.close();
        });
    }else if(!this.newUsuarioForm.dirty){
      this.newUsuarioForm.reset();
    }
  }

  buildNewUsuarioForm(): void{
    this.newUsuarioForm = this.fb.group({
      nombre: ['',[Validators.required, WhiteSpaceValidator.cannotContainSpace]],
      apellidos: ['',[Validators.required, WhiteSpaceValidator.cannotContainSpace]],
      cedula: ['',[Validators.compose([Validators.required, WhiteSpaceValidator.cannotContainSpace])]],
      correoElectronico: ['',[Validators.compose([Validators.required,WhiteSpaceValidator.cannotContainSpace])]],
      direccion: ['',[Validators.compose([Validators.required])]],
      telefonoCelular: ['',[Validators.compose([Validators.required,WhiteSpaceValidator.cannotContainSpace])]],
      telefono: ['',[Validators.compose([WhiteSpaceValidator.cannotContainSpace])]],
    });
  }

}
