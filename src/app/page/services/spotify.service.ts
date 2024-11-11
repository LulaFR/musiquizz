import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private searchUrl = 'https://api.spotify.com/v1/search';
  private albumTracksUrl = 'https://api.spotify.com/v1/albums/'

  http = inject(HttpClient);

  // Método para buscar un artista
  searchArtist(token: string, query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.searchUrl}?q=${encodeURIComponent(query)}&type=artist`, { headers });
  }

  searchPlaylist(token: string, query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.searchUrl}?q=${encodeURIComponent(query)}&type=playlist`, { headers });
  }

  searchAlbum(token: string, query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.searchUrl}?q=${encodeURIComponent(query)}&type=album`, { headers });
  }

  getAlbumTracks(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.albumTracksUrl}${id}/tracks`, { headers });
  }
}
