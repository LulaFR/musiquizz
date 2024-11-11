import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //general---------------------------------------------------------------------------------------------------------

  clearLocalStorage() {
    localStorage.clear();
  }

  //token-----------------------------------------------------------------------------------------------------------

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token')
    return (token != null ? token : '');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  //active user-----------------------------------------------------------------------------------------------------

  setActiveUser(id: string = '') {
    localStorage.setItem('activeUser', id);
  }

  getActiveUser() {
    return localStorage.getItem('activeUser');
  }

  //game mode-------------------------------------------------------------------------------------------------------

  setGameMode(gameMode: string) {
    localStorage.setItem('gameMode', gameMode);
  }

  getGameMode() {
    const gameMode = localStorage.getItem('gameMode')
    return (gameMode != null ? gameMode : '');
  }
}
