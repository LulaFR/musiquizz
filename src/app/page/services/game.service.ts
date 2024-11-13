import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameMode = new BehaviorSubject<string>('');
  private game = new BehaviorSubject<Game>({ rounds: []});
  private score = new BehaviorSubject<number>(0);

  getGameMode() {
    return this.gameMode.asObservable();
  }

  setGameMode(gameMode: string) {
    this.gameMode.next(gameMode);
  }

  getGame() {
    return this.game.asObservable();
  }

  setGame(game: Game) {
    this.game.next(game);
  }

  getScore() {
    return this.score.asObservable();
  }

  setScore(score: number) {
    this.score.next(score);
  }

}
