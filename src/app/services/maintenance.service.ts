import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Maintenance } from '../domain/Maintenance';
import { Answer } from '../common/answer';

@Injectable({
    providedIn: 'root'
})

export class MaintenanceService {
    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Maintenance[]> {
        return this.http.get<Maintenance[]>(`${environment.urlService}/Mantenimiento`);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${environment.urlService}/Mantenimiento/${id}`).
        pipe(
            map((response: any) => response)
        );
    }

    getById(id: number): Observable<Maintenance> {
        return this.http.get<Maintenance>(`${environment.urlService}/Mantenimiento/${id}`);
    }

    update(data: Maintenance): Observable<Response> {
        return this.http.put(`${environment.urlService}/Mantenimiento`, data)
            .pipe(
            map((response: any) => response)
        );
    }

    insert(data: Maintenance): Observable<Maintenance> {
        return this.http.post(`${environment.urlService}/Mantenimiento`, data)
        .pipe(
          map((response: any) => response)
        );
    }

    // upload(data: FormData): Observable<Answer> {
    //     return this.http.post(`${environment.urlService}/Mantenimiento/Upload`, data)
    //     .pipe(
    //       map((response: any) => response)
    //     );
    // }

    // getPaginated(page: number, rows: number, id: number): Observable<Maintenance[]> {
    //     return this.http.post<Maintenance[]>(`${environment.urlService}/Mantenimiento/ListaPaginada/`, {page, rows, id});
    // }

}
