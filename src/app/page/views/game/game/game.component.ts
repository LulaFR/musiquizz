import { Component } from '@angular/core';
import { Game } from '../../../entities/game';
import { GameService } from '../../../services/game.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoundComponent } from '../round/round.component';
import { ActiveService } from '../../../services/active.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RoundComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  constructor(private gameService: GameService, private router: Router, private activeService: ActiveService) {}
  
  game: Game = {
    rounds: []
  }

  score: number = 0;

  currentRound: number = 0;

  btnMsg: string = 'Siguiente';

  lastRound: boolean = false;

  ngOnInit(): void {
    this.gameService.getGame().subscribe(
      {
        next: (response) => {
          this.game = response;
        },
        error: (error: Error) => {
          console.log('Game Component Error: ' + error);
        }
      }
    )
  }

  nextRound(score: number) {
    this.score = this.score + score;
    if(this.currentRound < this.game.rounds.length - 1) {
      this.currentRound++;
    } else {
      this.activeService.patchActive({newScore: this.score}).subscribe(
        {
          error: (error: Error) => {
            alert('Save Score Error: ' + error);
          }
        }
      );
      this.btnMsg = 'Ver resultados'
      this.lastRound = true;
      alert('Fin del juego ' + this.score);
    }
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}
