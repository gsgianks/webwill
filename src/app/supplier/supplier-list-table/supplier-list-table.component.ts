import { Component, OnInit, Input } from '@angular/core';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-supplier-list-table',
  templateUrl: './supplier-list-table.component.html',
  styleUrls: ['./supplier-list-table.component.scss']
})
export class SupplierListTableComponent implements OnInit {

  @Input()
  items: Supplier[] =[];
  public columns: object[] = [];
  constructor() { }

  ngOnInit() {
    this.columns = this.getColumns();
  }

  private getColumns(): object[]{
    return[
      {
        name: "Id",
        prop: "id",
        flexGrow: 0.5
      },
      {
        name: "Company Name",
        prop: "companyName",
        flexGrow: 1
      },
      {
        name: "Contact Name",
        prop: "contactName",
        flexGrow: 1
      },{
        name: "City",
        prop: "city",
        flexGrow: 0.5
      }
    ];
  }

}
