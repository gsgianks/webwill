import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditUsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${environment.urlService}/Usuarios/${id}`);
  }

  editUsuario(data: Usuario): Observable<Response>{
    return this.http.put(`${environment.urlService}/Usuarios`, data)
      .pipe(
        map((response: any)=>response)
      )
  }
}
