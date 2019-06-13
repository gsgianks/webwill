import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewUsuarioService {

  constructor(private http: HttpClient) { }

  saveUsuario(data: Usuario): Observable<Response>{
    data.id = undefined;
    return this.http.post(`${environment.urlService}/Usuarios`,data)
    .pipe(
      map((response:any)=>response)
    );
  }
}
