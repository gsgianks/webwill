import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/domain/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mot-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  @Output() selectionChanged = new EventEmitter<User>();
  @Output() editModel = new EventEmitter<User>();

  private gridApi;
  private gridColumnApi;
  rowData: User[] = [];

  columnDefs = [
    {headerName: 'Nombre', field: 'nombre', sortable: true, filter: true},
    {headerName: 'Apellidos', field: 'apellidos', sortable: true, filter: true},
    {headerName: 'Cédula', field: 'cedula', sortable: true, filter: true},
    {headerName: 'Correo', field: 'correoElectronico', sortable: true, filter: true},
    {headerName: 'Celular', field: 'telefonoCelular', sortable: true, filter: true},
    {headerName: 'Dirección', field: 'direccion', sortable: true, filter: true}
  ];

  constructor(
    private service: UserService,
    private router: Router
  ) {
    this.getUsuario(1, 200);
  }

  ngOnInit() {

  }

   getUsuario(page: number, rows: number): void {
    this.service.getAll(page, rows)
    .subscribe(
      response => {
        this.rowData = response;
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    // params.api.sizeColumnsToFit();
    // tslint:disable-next-line: only-arrow-functions
    window.addEventListener('resize', function() {
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }

  selectModel(model: User, editModel = false): void {
    if (!model) {
      model = {
        id: 0
      } as User;
    }
    if (editModel) {
      this.editModel.emit(model);
    } else {
      this.selectionChanged.emit(model);
    }
  }

  editClicked(data: any): void {
    // const model = data as IRequestCandidateView;
    // this.toastr.clear();

    // this.router.navigate(['/resources', 'hunting', model.RequestId, 'candidates', model.Id]);
  }

  deleteClicked(data: any): void {
    // const model = data as IRequestCandidateView;
    // this.dialog
    //   .open(ConfirmationDialogComponent, {
    //     width: '350px',
    //     data: <IDialogData>{
    //       title: `Delete Request Candidate`,
    //       question: `Are you sure you want to delete the selected Request Candidate?`
    //     }
    //   })
    //   .afterClosed()
    //   .subscribe(result => {
    //     if (result) {
    //       this.odataRequestCandidate
    //         .delete(model.Id)
    //         .exec()
    //         .subscribe(() => this.grid.getData());
    //     }
    //   });
  }

  onCellDoubleClicked(data: any) {
    // console.log(data);
    this.router.navigate(['/user', 'edit', data.data.id]);

  }


  getAll(): void {
    this.getUsuario(1, 200);
  }
}
