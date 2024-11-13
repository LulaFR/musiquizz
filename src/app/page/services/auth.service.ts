import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
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

  private activeUser = new BehaviorSubject<User>(
    {
      id: '',
      password: '',
      topRanking: []
    }
  );

  private token = new BehaviorSubject<string>('');

  getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  //USAR ESTOS
  setToken(token: string) {
    this.token.next(token);
  }

  getToken(): Observable<string> {
    return this.token.asObservable();
  }
  
  isLoggedIn() { //probar
    let t = '';
    this.token.asObservable().pipe(
      map((token) => (t = token))
    );
    return (t == ''? false : true);
    // return !!localStorage.getItem('token');
  }

  // clearLocalStorage() {
  //   localStorage.clear();
  // }

  // setActiveUser(user: User) {
  //   this.activeUser.next(user);
  // }

  // getActiveUser(): Observable<User> {
  //   return this.activeUser.asObservable();
  // }
}
