import { Component, OnInit, Inject } from '@angular/core';
import { DetailsUsuarioService } from './details-usuario.service';
import { Usuario } from '../models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData{
  id: number;
}


@Component({
  selector: 'app-details-usuario',
  templateUrl: './details-usuario.component.html',
  styleUrls: ['./details-usuario.component.scss'], 
  providers: [DetailsUsuarioService]
})
export class DetailsUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  constructor(private service: DetailsUsuarioService,public dialogRef: MatDialogRef<Usuario>, @Inject(MAT_DIALOG_DATA) public data:DialogData ) { 
    this.usuarioRetrieved(data.id);
  }

  ngOnInit() {
  }

  usuarioRetrieved(id: number): void{
    this.service.getUsuarioById(id)
      .subscribe(response =>{
        this.usuario = response;
      })
  }

}
