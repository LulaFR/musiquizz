import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

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
    topRanking: []
  }

  //MÉTODOS---------------------------------------------------------
  
  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, user);
  }
  
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/${id}`).pipe(
      catchError((error) => (this.manageError(error)))
    );
  }
  
  putUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/${id}`, user);
  }


  private manageError(error: any): Observable<never> {
    if(error.status == 404) {
      return throwError(() => new Error('Usuario no encontrado.'));
    }else {
      return throwError(() => new Error('Hubo un problema con la solicitud.'));
    }
  }
}
