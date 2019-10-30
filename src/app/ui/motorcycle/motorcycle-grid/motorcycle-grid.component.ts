import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Motorcycle } from 'src/app/domain/Motorcycle';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mot-motorcycle-grid',
  templateUrl: './motorcycle-grid.component.html',
  styleUrls: ['./motorcycle-grid.component.scss']
})
export class MotorcycleGridComponent implements OnInit {
  @Output() selectionChanged = new EventEmitter<Motorcycle>();
  @Output() editModel = new EventEmitter<Motorcycle>();

  private gridApi;
  private gridColumnApi;
  rowData: Motorcycle[] = [];

  columnDefs = [
    {headerName: 'Placa', field: 'numeroPlaca', sortable: true, filter: true},
    {headerName: 'Marca', field: 'marca', sortable: true, filter: true},
    {headerName: 'Modelo', field: 'modelo', sortable: true, filter: true},
    {headerName: 'Id Usuario', field: 'idUsuario', width: 110}
  ];

  constructor(
    private service: MotorcycleService,
    private router: Router
  ) {
    this.getAll();
  }

  ngOnInit() {

  }

  getAll(): void {
    this.service.getAll()
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

  selectModel(model: Motorcycle, editModel = false): void {
    if (!model) {
      model = {
        id: 0
      } as Motorcycle;
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

}
