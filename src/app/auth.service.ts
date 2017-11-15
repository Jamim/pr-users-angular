import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

import { NewUser } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AuthService {
  private signUpUrl = '/api/auth/signup/';
  private loginUrl = '/api/auth/login/';
  private logoutUrl = '/api/auth/logout/';

  loggedIn: boolean;
  loginChecked = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  checkLogin() {
    this.http.get(this.loginUrl).pipe(
      tap(_ => {
        this.loggedIn = true;
        this.loginChecked = true;
      }),
      catchError(this.handleError<any>('checkLogin'))
    ).subscribe();
  }

  signUp(user: NewUser): Observable<any> {
    return this.http.post(this.signUpUrl, user, httpOptions).pipe(
      tap(_ => this.loggedIn = true),
      catchError(this.handleError<any>('signUp'))
    );
  }

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };
    return this.http.post(this.loginUrl, credentials, httpOptions).pipe(
      tap(_ => this.loggedIn = true),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, null, httpOptions).pipe(
      tap(_ => this.loggedIn = false),
      catchError(this.handleError<any>('logout'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (operation === 'checkLogin') {
        this.loggedIn = false;
        this.loginChecked = true;
      } else {
        console.error(error);
      }

      return of(result as T);
    };
  }
}
