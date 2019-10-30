import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs';
import { Role } from '../domain/role.enum';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import * as decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { transformError } from '../common/common';
import { User } from '../domain/User';
import { Result } from '../common/result';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  private readonly authProvider: (email: string, password: string) => Observable<Result<User, IServerAuthResponse>>;
  // tslint:disable-next-line: no-use-before-declare
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthStatus);

  constructor(private http: HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => {
      this.setItem('authStatus', authStatus);
    });
    this.authProvider = this.userAuthProvider;
   }

  private userAuthProvider( email: string, password: string): Observable<Result<User, IServerAuthResponse>> {
    return this.http.post<Result<User, IServerAuthResponse>>(`${environment.urlService}/token`, {email, password});
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      map(value => {
        this.setToken(value.itemOptional.access_Token);
        const result = decode(value.itemOptional.access_Token);
        return result as IAuthStatus;
      }),
      catchError(transformError)
    );

    loginResponse.subscribe(
      res => {
        console.log(res);
        this.authStatus.next(res);
      },
      err => {
        this.logout();
        console.log(err);
        return observableThrowError(err);
      }
    );
    return loginResponse;
  }

  logout() {
    this.clearToken();
    // tslint:disable-next-line: no-use-before-declare
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  getToken(): string {
    return this.getItem('jwt') || '';
  }

  private clearToken() {
    this.removeItem('jwt');
  }

  getAuthStatus(): IAuthStatus {
    return this.getItem('authStatus');
  }
}


export interface IAuthStatus {
  role: Role;
  primarysid: number;
  unique_name: string;
}

interface IServerAuthResponse {
  access_Token: string;
}

const defaultAuthStatus: IAuthStatus = {role: Role.None, primarysid: null, unique_name: null};
