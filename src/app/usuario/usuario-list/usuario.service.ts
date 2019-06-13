import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { 

  }
  getUsuarioList(page: number,rows: number): Observable<Usuario[]>{
    return this.http.post<Usuario[]>(`${environment.urlService}/Usuarios/ListaPaginadaUsuarios/`,{page: page,rows: rows});
  }

  deleteUsuario(id: number): Observable<Response>{
    return this.http.delete(`${environment.urlService}/Usuarios/${id}`).
      pipe(
        map((response: any)=>response)
      );
  }
}
