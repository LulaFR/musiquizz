import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private urlBase = 'http://localhost:3000/users';
  private http = inject(HttpClient);

  private user: User = {
    id: '',
    password: '',
    accessToken: '',
    topRanking: []
  }

  //MÉTODOS---------------------------------------------------------

  getActiveUser() {
    

    return this.user;
  }

  setActiveUser(user: User) {
    this.user = user;
  }

  //------------------------------------------------------------------
  getAccessToken() {
    return this.user.accessToken;
  }
  
  setAccessToken(accessToken: string) {
    this.user.accessToken = accessToken;
  }
  
  //------------------------------------------------------------------

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, user);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/${id}`);
  }

  putUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/${id}`, user);
  }

}
