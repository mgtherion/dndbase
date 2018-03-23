import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observables } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(
      '/api/login',
      JSON.stringify({username: username, password: password})
     ).map((response: Response) => {
       let token = response.json() && response.json().token;
       if (token) {
         localStorage.setItem(
          'currentUser',
          JSON.stringify({username: username, password: password})
         );

         return true;
       } else {
         return false;
       }
     });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
