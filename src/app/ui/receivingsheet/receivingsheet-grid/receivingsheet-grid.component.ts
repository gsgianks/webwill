import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReceivingSheet } from 'src/app/domain/ReceivingSheet';
import { ReceivingSheetService } from 'src/app/services/receivingsheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mot-receivingsheet-grid',
  templateUrl: './receivingsheet-grid.component.html',
  styleUrls: ['./receivingsheet-grid.component.scss']
})
export class ReceivingSheetGridComponent implements OnInit {

  @Output() selectionChanged = new EventEmitter<ReceivingSheet>();
  @Output() editModel = new EventEmitter<ReceivingSheet>();

  private gridApi;
  private gridColumnApi;
  rowData: ReceivingSheet[] = [];

  columnDefs = [
    {headerName: 'Usuario', field: 'idUsuario', sortable: true, filter: true},
    {headerName: 'Motocicleta', field: 'idMotocicleta', sortable: true, filter: true},
    {headerName: 'Trabajo', field: 'trabajoRealizar', sortable: true, filter: true},
    {headerName: 'Observaciones', field: 'observaciones', sortable: true, filter: true},
    {headerName: 'Fecha Ingreso', field: 'fechaIngreso', sortable: true, filter: true,
      cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
      }
    },
    {headerName: 'Fecha Salida', field: 'fechaSalida', sortable: true, filter: true,
    cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
      }
    },
  ];

  constructor(
    private service: ReceivingSheetService,
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

    // tslint:disable-next-line: only-arrow-functions
    window.addEventListener('resize', function() {
      // tslint:disable-next-line: only-arrow-functions
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }

  selectModel(model: ReceivingSheet, editModel = false): void {
    if (!model) {
      model = {
        id: 0
      } as ReceivingSheet;
    }
    if (editModel) {
      this.editModel.emit(model);
    } else {
      this.selectionChanged.emit(model);
    }
  }


  onCellDoubleClicked(data: any) {
    this.router.navigate(['/receivingsheet', 'edit', data.data.id]);

  }

}
