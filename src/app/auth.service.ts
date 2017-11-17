import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

import { Login } from './login';
import { NewUser } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AuthService {
  private signUpUrl = '/api/auth/signup/';
  private loginUrl = '/api/auth/login/';
  private logoutUrl = '/api/auth/logout/';

  currentLogin: Login;
  loginChecked = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  setCurrentLogin(login: Login, callback?: (login: Login) => void): void {
    this.currentLogin = login;
    this.loginChecked = true;
    if (callback) {
      callback(login);
    }
  }

  checkLogin(): void {
    this.http.get<Login>(this.loginUrl).pipe(
      catchError(this.handleError<Login>('checkLogin'))
    ).subscribe((login: Login) => this.setCurrentLogin(login));
  }

  signUp(user: NewUser, callback: (login: Login) => void): void {
    this.http.post<Login>(this.signUpUrl, user, httpOptions).pipe(
      catchError(this.handleError<Login>('signUp'))
    ).subscribe((login: Login) => this.setCurrentLogin(login, callback));
  }

  login(username: string, password: string,
        callback: (login: Login) => void): void {
    const credentials = {
      username: username,
      password: password
    };
    this.http.post<Login>(this.loginUrl, credentials, httpOptions).pipe(
      catchError(this.handleError<Login>('login'))
    ).subscribe((login: Login) => this.setCurrentLogin(login, callback));
  }

  logout(callback: (login: Login) => void): void {
    this.http.post<Login>(this.logoutUrl, null, httpOptions).pipe(
      catchError(this.handleError<Login>('logout'))
    ).subscribe((login: Login) => this.setCurrentLogin(login, callback));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (operation === 'checkLogin') {
        this.currentLogin = null;
        this.loginChecked = true;
      } else {
        console.error(error);
      }

      return of(result as T);
    };
  }
}
