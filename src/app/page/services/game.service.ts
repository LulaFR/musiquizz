import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../entities/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game = new BehaviorSubject<Game>({ rounds: []});
  private score = new BehaviorSubject<number>(0);

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
