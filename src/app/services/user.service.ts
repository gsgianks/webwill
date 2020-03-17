import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../domain/User';
import { ResultBaseModel } from '../common/ResultBaseModel';
import { ResponseModel } from '../common/ResponseModel';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {

    }

    getAll(): Observable<ResponseModel<User>> {
        return this.http.get<ResponseModel<User>>(`${environment.urlService}/Usuarios`);
    }

    getAllPaginated(page: number, rows: number): Observable<User[]> {
        return this.http.post<User[]>(`${environment.urlService}/Usuarios/ListaPaginadaUsuarios/`, {page, rows});
    }

    delete(id: number): Observable<ResultBaseModel> {
        return this.http.delete(`${environment.urlService}/Usuarios/${id}`).
        pipe(
            map((response: ResultBaseModel) => response)
        );
    }

    getById(id: number): Observable<ResponseModel<User>> {
        return this.http.get<ResponseModel<User>>(`${environment.urlService}/Usuarios/${id}`);
    }

    update(data: User): Observable<ResultBaseModel> {
        return this.http.put(`${environment.urlService}/Usuarios`, data)
            .pipe(
            map((response: ResultBaseModel) => response)
        );
    }

    insert(data: User): Observable<ResponseModel<User>> {
        data.id = undefined;
        return this.http.post(`${environment.urlService}/Usuarios`, data)
        .pipe(
          map((response: ResponseModel<User>) => response)
        );
      }
}
