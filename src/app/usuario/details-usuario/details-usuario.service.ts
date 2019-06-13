import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsUsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${environment.urlService}/customer/${id}`);
  }
}

