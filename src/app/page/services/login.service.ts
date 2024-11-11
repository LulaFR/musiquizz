import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Location } from '@angular/common';

//EN DESUSO
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private location = inject(Location);

  private urlBase: string = 'https://accounts.spotify.com';
  // private redirectUri: string = 'http%3A%2F%2Flocalhost%3A4200%2F'; //nica dijo q no va a ser siempre el mismo
  private redirectUri: string = 'http://localhost:4200/callback'; //nica dijo q no va a ser siempre el mismo
  private clientId: string = environment.client_id;
  private clientSecret: string = environment.client_secret;
  private scopes = 'user-modify-playback-state playlist-read-private user-read-email user-read-private'; // Agrega los scopes que necesites.
  private currentPath: string = this.location.path();
  private authCode: string = '';

  requestAuthorization(): string { //FUNCIONA
    window.location.href = `${this.urlBase}/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scopes}&show_dialog=true`;
    return this.currentPath = this.location.path();
  }




  public getAuthUrl(): string {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('response_type', 'code')
      .set('redirect_uri', this.redirectUri)
      .set('scope', this.scopes)
      .set('show_dialog', 'true');

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  public requestAccessToken(authCode: string) {
    return this.http.post('http://localhost:3000/access_token', { code: authCode });
  }


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


}
