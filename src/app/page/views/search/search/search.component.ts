import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { SearchFormComponent } from "../search-form/search-form/search-form.component";
import { OnInit } from '@angular/core';
import { Album } from '../../../entities/album';
import { Track } from '../../../entities/track';
import { Artist } from '../../../entities/artist';
import { GamePreparationComponent } from '../game-preparation/game-preparation.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ActiveService } from '../../../services/active.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchFormComponent, GamePreparationComponent, FooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  ngOnInit(): void {
    this.activeService.getActive().subscribe(
      {
        next: (response) => {
          this.searchType = response.gameMode;
        }
      }
    )
    this.getToken();
  }
  constructor(private spotifyService: SpotifyService, private router: Router, private authService: AuthService, private activeService: ActiveService) {}

  
  //ATRIBUTOS--------------------------------------------------------------------------------------------------------
  
  searchType: string = '' //para el placeholder

  //ATRIBUTOS ÁLBUM
  
  albums: Album[] = []; //para almacenar los álbums recuperados en una búsqueda
  album: Album = {
    totalTracks: 0,
    id: '',
    imgUrl: '',
    name: '',
    artistsNames: []
  }
  selectedAlbum: Album = {
    totalTracks: 0,
    id: '',
    imgUrl: '',
    name: '',
    artistsNames: []
  }
  tracks: Track[] = [];
  track: Track = {
    id:'',
    name: '',
    preview: '',
    img:  ''
  }
  
  //ATRIBUTOS ARTISTA

  artists: Artist[] = [];
  artist: Artist = {
    name: '',
    id: '',
    imgUrl: '',
  }
  selectedArtist: Artist = {
    name: '',
    id: '',
    imgUrl: '',
  }


  activeSearch: boolean = false; //para ver si se muestra el scrollbar o no
  disablePlayButton: boolean = true; //para detectar si hay una opción elegida
  selectedAlbumId: string = ''; //id del álbum elegido
  selectedArtistId: string = ''; //id del artista elegido
  activatePlay: boolean = false;
  available: boolean = true;
  token: string = '';


  
  //MÉTODOS DE BÚSQUEDA----------------------------------------------------------------------------------------------
  
  searchArtist(artist: string) {
    this.artists = []; //limpio el array de artistas
    console.log('Entro a search artist');
    
    this.spotifyService.searchArtist(this.token, artist).subscribe(
      {
        next: (response) => {
          console.log('Entro a next');
          response.artists.items.map((item: any) => {
            this.artist.id = item.id;
            this.artist.imgUrl = item.images[0]?.url || '';
            this.artist.name = item.name;
            
            this.artists.push({...this.artist}); //meto una copia del objeto al array de álbums
            
            this.activeSearch = true;
          })

        },
        error: (error: Error) => {
          // alert('Hubo un error al buscar los artistas: ' + error);
          this.refreshToken(artist);
        }
      }
    );
  }
  
  searchAlbum(album: string) {
    this.albums = []; //limpio el array de álbums
    console.log('Entro a search album');

    this.spotifyService.searchAlbum(this.token, album).subscribe(
      {
        next: (response) => {
          console.log(response);
          response.albums.items.map((item: any) => {
            this.album.totalTracks = item.total_tracks;
            this.album.id = item.id;
            this.album.imgUrl = item.images[0]?.url || '';
            this.album.name = item.name;
            item.artists.map((artist: any) => (this.album.artistsNames.push(artist.name)));
            
            this.albums.push({...this.album}); //meto una copia del objeto al array de álbums
            
            this.album.artistsNames = []; //limpio el array de artistas
            
            this.activeSearch = true;
          })
        },
        error: (error: Error) => {
          // alert('Hubo un error al buscar los álbums: ' + error);
          this.refreshToken(album);
        }
      }
    );
  }
  
  getAlbumTracks() {
    this.tracks = []; //limpio el array de tracks
    this.spotifyService.getAlbumTracks(this.token, this.selectedAlbum.id).subscribe(
      {
        next: (response) => {
          //corroboro que todas las pistas tengan audio
          if (response.items.length < 4) {
            alert('El álbum no tiene la cantidad de tracks suficiente.');
            return;
          }
          const allTracksHavePreview = response.items.every((item: any) => item.preview_url);

          if (!allTracksHavePreview) {
            alert('Algunos tracks no tienen pistas de audio. Seleccioná otro álbum.');
            return;
          }

          //todos los tracks tienen pistas de audio
          response.items.map((item: any) => {
              this.track.id = item.id;
              this.track.img = this.selectedAlbum.imgUrl;
              this.track.name = item.name;
              this.track.preview = item.preview_url;

              this.tracks.push({...this.track});
            })

            this.activatePlay = true;
          },
          error: (error: Error) => {
            // alert('Hubo un error al intentar obtener los tracks: ' + error);
            this.refreshToken(null);
          }
        }
      );
    }
    
  //MÉTODOS DE SELECCIÓN---------------------------------------------------------------------------------------------

  selectChoiceId(id: string) {
    if(this.searchType == 'album') {
      this.selectedAlbum = this.searchStoredChoice(id);
      this.disablePlayButton = false; //PASAR FUERA DEL IF UNA VEZ QUE ESTÉ TERMINADO EL MODO ARTISTA
    } else if(this.searchType == 'artist') {
      this.selectedArtist = this.searchStoredChoice(id);
    }
  }
  
  //MÉTODOS DE ACCIÓN---------------------------------------------------------------------------------------------

  play() {
    this.getAlbumTracks();
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  //MÉTODOS DE MODULARIZACIÓN----------------------------------------------------------------------------------------
  
  searchStoredChoice(id: string): any {
    if (this.searchType == 'album') {
      return this.albums.filter((album) => (album.id == id))[0];
    } else if (this.searchType == 'artist') {
      return this.artists.filter((artist) => (artist.id == id))[0];
    }
  }
  
  deactivatePlay() {
    // try {
    //   this.activatePlay = false;
    // } catch (error) {
    //   console.log('ERROOOOOOOOR');
    //   this.selectedAlbum = {
    //     totalTracks: 0,
    //     id: '',
    //     imgUrl: '',
    //     name: '',
    //     artistsNames: []
    //   }

    //   this.tracks = [];
    // }
    this.activatePlay = false;
  }
  
  //MÉTODOS DE TOKEN-------------------------------------------------------------------------------------------------

  getToken() {
    this.activeService.getActive().subscribe(
      {
        next: (r) => {
          this.token = r.token;
        }
      }
    )
  }

  refreshToken(previousSearch: string | null) {
    this.authService.getAccessToken().subscribe(
      {
        next: (response) => {
          this.token = response.access_token;
          if (previousSearch) {
            this.saveRefreshedToken(previousSearch);
          } else {
            this.getAlbumTracks(); //si el token se vence entre que se busca y se selecciona el álbum
          }                       //poco probable que pase, pero no imposible :p
        },
        error: (error: Error) => {
          alert('Refresh Token Error: ' + error);
        }
      }
    )
  }
  
  saveRefreshedToken(previousSearch: string) {
    this.activeService.patchActive({token: this.token}).subscribe(
      {
        next: (response) => {
          this.searchAlbum(previousSearch);
        },
        error: (error: Error) => {
          alert('Save Refreshed Token Error: ' + error);
        }
      }
    )

  }
}
