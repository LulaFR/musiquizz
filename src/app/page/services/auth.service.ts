import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Location } from '@angular/common';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private http = inject(HttpClient);
  private location = inject(Location);

  private urlBase: string = 'https://accounts.spotify.com'; //ver si se usa
  private clientId: string = environment.client_id;
  private clientSecret: string = environment.client_secret;
  private tokenUrl = 'https://accounts.spotify.com/api/token';

  getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  //PASADO A LOCAL STORAGE SERVICE
  //CAMBIAR EN COMPONENTES QUE USAN ESTOS MÉTODOS DESDE ACÁ
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  setActiveUser(id: string = '') {
    localStorage.setItem('activeUser', id);
  }

  getActiveUser() {
    return localStorage.getItem('activeUser');
  }
}
