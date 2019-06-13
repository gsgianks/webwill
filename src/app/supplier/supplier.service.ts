import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from './models/supplier';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplierList(page: number, rows: number, searchTerm: string):Observable<Supplier[]>{
    
    return this.http.post<Supplier[]>(`${environment.urlService}/supplier/GetPaginatedSupplier`, {page: page,rows: rows, searchTerm: searchTerm});
  }
}
