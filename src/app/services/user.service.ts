import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../domain/User';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) {

    }

    getAll(page: number, rows: number): Observable<User[]> {
        return this.http.post<User[]>(`${environment.urlService}/Usuarios/ListaPaginadaUsuarios/`, {page, rows});
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${environment.urlService}/Usuarios/${id}`).
        pipe(
            map((response: any) => response)
        );
    }

    getById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.urlService}/Usuarios/${id}`);
    }

    update(data: User): Observable<Response> {
        return this.http.put(`${environment.urlService}/Usuarios`, data)
            .pipe(
            map((response: any) => response)
        );
    }

    insert(data: User): Observable<User> {
        data.id = undefined;
        return this.http.post(`${environment.urlService}/Usuarios`, data)
        .pipe(
          map((response: any) => response)
        );
      }
}
