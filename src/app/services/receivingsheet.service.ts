import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ReceivingSheet } from '../domain/ReceivingSheet';
import { ResultBaseModel } from '../common/ResultBaseModel';

@Injectable({
    providedIn: 'root'
})

export class ReceivingSheetService {
    constructor(private http: HttpClient) {

    }

    getAll(): Observable<ReceivingSheet[]> {
        return this.http.get<ReceivingSheet[]>(`${environment.urlService}/HojaRecibimiento`);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${environment.urlService}/HojaRecibimiento/${id}`).
        pipe(
            map((response: any) => response)
        );
    }

    getById(id: number): Observable<ReceivingSheet> {
        return this.http.get<ReceivingSheet>(`${environment.urlService}/HojaRecibimiento/${id}`);
    }

    update(data: ReceivingSheet): Observable<Response> {
        return this.http.put(`${environment.urlService}/HojaRecibimiento`, data)
            .pipe(
            map((response: any) => response)
        );
    }

    insert(data: ReceivingSheet): Observable<ReceivingSheet> {
        return this.http.post(`${environment.urlService}/HojaRecibimiento`, data)
        .pipe(
          map((response: any) => response)
        );
    }

    // getPaginated(page: number, rows: number, id: number): Observable<ReceivingSheet[]> {
    //     return this.http.post<ReceivingSheet[]>(`${environment.urlService}/HojaRecibimiento/ListaPaginada/`, {page, rows, id});
    // }

}
