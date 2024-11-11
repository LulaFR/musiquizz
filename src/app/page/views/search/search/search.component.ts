import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { SearchFormComponent } from "../search-form/search-form/search-form.component";
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Album } from '../../../entities/album';
import { Track } from '../../../entities/track';
import { GamePreparationComponent } from '../game-preparation/game-preparation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchFormComponent, GamePreparationComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  ngOnInit(): void {
    this.searchType = this.lsService.getGameMode();
  }
  constructor(private spotifyService: SpotifyService, private lsService: LocalStorageService, private router: Router) {}

  
  //ATRIBUTOS--------------------------------------------------------------------------------------------------------
  
  searchType: string = '' //para el placeholder
  albums: Album[] = []; //para almacenar los álbums recuperados en una búsqueda
  album: Album = {
    // albumType: '',
    totalTracks: 0,
    id: '',
    imgUrl: '',
    // imgHeight: 0,
    // imgWidth: 0,
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
  activeSearch: boolean = false; //para ver si se muestra el scrollbar o no
  disablePlayButton: boolean = true; //para detectar si hay una opción elegida
  selectedAlbumId: string = ''; //id del álbum elegido
  selectedArtistId: string = ''; //id del artista elegido
  activatePlay: boolean = false;
  available: boolean = true;


  
  //MÉTODOS DE BÚSQUEDA----------------------------------------------------------------------------------------------
  
  searchArtist(artist: string) {
    this.spotifyService.searchArtist(this.lsService.getToken(), artist).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (error: Error) => ('Hubo un error: ' + error)
      }
    );
  }
  
  // searchPlaylist() {
  //   this.spotifyService.searchPlaylist("BQB9R-t7afNAZ5MtFdJqkZzdSQ3rwP8u2N0BHpDOvfm9lKSdqO5Y5H4bmLZZpFXgyzOr9Wfu1vvxyqbKHqnPHfp6guKevCLVk4goBZ7Es5qnUtQQ3Qk", "shower songs").subscribe(
    //     {
      //       next: (response) => {
        //         console.log(response);
        //       },
        //       error: (error: Error) => ('Hubo un error: ' + error)
        //     }
        //   );
        // }
        
  searchAlbum(album: string) {
    this.albums = []; //limpio el array de álbums

    console.log('Entro a get album');
    console.log(this.lsService.getToken());
    this.spotifyService.searchAlbum(this.lsService.getToken(), album).subscribe(
      {
        next: (response) => {
          console.log(response);
          response.albums.items.map((item: any) => {
            this.album.totalTracks = item.total_tracks;
            this.album.id = item.id;
            this.album.imgUrl = item.images[0]?.url || '';
            this.album.name = item.name;
            item.artists.map((artist: any) => (this.album.artistsNames.push(artist.name)));
            // this.album.albumType = item.album_type;
            // this.album.imgHeight = item.images[0]?.height || 0;
            // this.album.imgWidth = item.images[0]?.width || 0;
            // this.album.artistsNames = item.artists.map((artist: any) => this.album.artistsNames.push(artist.name));
            
            this.albums.push({...this.album}); //meto una copia del objeto al array de álbums
            
            this.album.artistsNames = []; //limpio el array de artistas
            
            this.activeSearch = true;
          })
        },
        error: (error: Error) => ('Hubo un error: ' + error)
      }
    );
  }
  
  getAlbumTracks() {
    this.albums = []; //limpio el array de álbums
    this.spotifyService.getAlbumTracks(this.lsService.getToken(), this.selectedAlbum.id).subscribe(
      {
        next: (response) => {
          //corroboro que todas las pistas tengan audio
          const allTracksHavePreview = response.items.every((item: any) => item.preview_url);

          if (!allTracksHavePreview) {
            alert('Algunos tracks no tienen pistas de audio. Seleccioná otro álbum.');
            return;
          }

          // console.log(response);
          //todos los tracks tienen pistas de audio
          response.items.map((item: any) => {

              this.track.id = item.id;
              this.track.img = this.selectedAlbum.imgUrl;
              this.track.name = item.name;
              this.track.preview = item.preview_url;

              this.tracks.push({...this.track});
              // console.log('CANCIOOOOOON: ' + this.tracks[0].name);

            })
            this.activatePlay = true;
          },
          error: (error: Error) => ('Hubo un error: ' + error)
        }
      );
    }
    
  //MÉTODOS DE SELECCIÓN---------------------------------------------------------------------------------------------
  
  selectAlbumId(id: string) {
    console.log('GUARDO ID');
    this.selectedAlbum = this.searchStoredAlbum(id);
    this.disablePlayButton = false;
  }
  
  //MÉTODOS DE SELECCIÓN---------------------------------------------------------------------------------------------

  play() {
    this.getAlbumTracks();
  }

  goBack() {
    this.router.navigate(['/menu']);
  }

  //MÉTODOS DE MODULARIZACIÓN----------------------------------------------------------------------------------------

  searchStoredAlbum(id: string): Album {
    return this.albums.filter((album) => (album.id == id))[0];
  }
}
