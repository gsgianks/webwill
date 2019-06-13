import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewUsuarioComponent } from '../new-usuario/new-usuario.component';
import { EditUsuarioComponent } from '../edit-usuario/edit-usuario.component';
import { DetailsUsuarioComponent } from '../details-usuario/details-usuario.component';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
  providers: [UsuarioService]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  numberOfRecords: number = 0;
  pageSizeOptions: number[] = [5,10,20];
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { 
    this.getUsuario(1,this.pageSize);
  }

  ngOnInit() {
  }

  getUsuario(page: number, rows: number): void{
    console.log(page+"  -  " +rows);
    this.usuarioService.getUsuarioList(page,rows)
    .subscribe(
      response => {
        console.log(response[0])
        this.usuarios = response;
        this.numberOfRecords = response[0].totalRecords;
      }
    );
  }
  changePage(event: any): void{
    this.getUsuario(event.pageIndex + 1, event.pageSize);
  }

  newUsuario(): void{
    const dialogRef = this.dialog.open(NewUsuarioComponent, {
      panelClass: "new-usuario-modal-dialog"
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuario(1,this.pageSize);
    })
  }

  editUsuario(id:number):void{
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      panelClass: "new-usuario-model-dialog",
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuario(1,this.pageSize);
    })
  }

  viewDetails(id:number):void{
    const dialogRef = this.dialog.open(DetailsUsuarioComponent, {
      panelClass: "new-usuario-model-dialog",
      data: {id: id}
    })

    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuario(1,this.pageSize);
    })
  }


  buscarUsuario():void{
    this.usuarioService.getUsuarioList(1,this.pageSize)
    .subscribe(
      response => {
        this.usuarios = response;
        this.numberOfRecords = response[0].totalRecords;
      }
    );
  }

  eliminarUsuario(id: number):void{
    this.usuarioService.deleteUsuario(id)
    .subscribe(response => {
      this.buscarUsuario();
    });
  }

}
