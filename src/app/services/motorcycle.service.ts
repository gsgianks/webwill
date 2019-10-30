import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Motorcycle } from '../domain/Motorcycle';

@Injectable({
    providedIn: 'root'
})

export class MotorcycleService {
    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Motorcycle[]> {
        return this.http.get<Motorcycle[]>(`${environment.urlService}/Motocicleta`);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${environment.urlService}/Motocicleta/${id}`).
        pipe(
            map((response: any) => response)
        );
    }

    getById(id: number): Observable<Motorcycle> {
        return this.http.get<Motorcycle>(`${environment.urlService}/Motocicleta/${id}`);
    }

    update(data: Motorcycle): Observable<Response> {
        return this.http.put(`${environment.urlService}/Motocicleta`, data)
            .pipe(
            map((response: any) => response)
        );
    }

    insert(data: Motorcycle): Observable<Motorcycle> {
        data.id = undefined;
        return this.http.post(`${environment.urlService}/Motocicleta`, data)
        .pipe(
          map((response: any) => response)
        );
      }
}
