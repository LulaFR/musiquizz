import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor(private userService: UserService) {}

  private http = inject(HttpClient);

  private urlBase: string = 'http://localhost:3000/active/active';

  getActive(): Observable<any> {
    return this.http.get<any>(this.urlBase);
  }

  // getActiveUserId(): Observable<string> {
  //   return this.http.get<{ active: { userId: string; token: string; gameMode: string }}>(this.urlBase).pipe(
  //     map((response) => response.active.gameMode)
  //   )
  // }
  // getActiveToken(): Observable<string> {
  //   return this.http.get<{ active: { userId: string; token: string; gameMode: string }}>(this.urlBase).pipe(
  //     map((response) => response.active.token)
  //   )
  // }
  // getActiveGameMode(): Observable<string> {
  //   return this.http.get<{ active: { userId: string; token: string; gameMode: string }}>(this.urlBase).pipe(
  //     map((response) => response.active.gameMode)
  //   )
  // }
  
  patchActive(changes: Partial<{userId: string; token: string; gameMode: string; newScore: number}>): Observable<any> {
    return this.http.patch<any>(this.urlBase, changes);
  }

  restoreActive(): Observable<any> {
    return this.http.put<any>(`${this.urlBase}`, {
      userId: '',
      token: '',
      gameMode: '',
      newScore: 0
    });
  }
}
