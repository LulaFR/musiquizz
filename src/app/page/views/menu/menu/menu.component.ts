import { Component } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router, private lsService: LocalStorageService) {}

  //variables-------------------------------------------------------------------------------------------------------
  
  enableArtistMode: boolean = false;
  enableAlbumMode: boolean = false;
  disablePlayButton: boolean = true;
  
  selected: string = 'var(--marron-claro)';
  
  //buttons---------------------------------------------------------------------------------------------------------
  
  selectArtistMode() {
    this.enableArtistMode = true;
    this.enableAlbumMode = false;
    this.disablePlayButton = false;
  }
  
  selectAlbumMode() {
    this.enableAlbumMode = true;
    this.enableArtistMode = false;
    this.disablePlayButton = false;
  }
  
  unselectAll() {
    this.enableAlbumMode = false;
    this.enableArtistMode = false;
    this.disablePlayButton = true;
  }
  
  //profile---------------------------------------------------------------------------------------------------------
  
  seeProfile() {
    this.router.navigate(['/profile']);
  }
  
  //play------------------------------------------------------------------------------------------------------------
  
  play() {
    this.setGameMode();
    this.router.navigate(['/search']);
  }

  setGameMode() {
    if(this.enableAlbumMode) {
      this.lsService.setGameMode('album');
    } else if(this.enableArtistMode) {
      this.lsService.setGameMode('artist');
    }
  }

}
