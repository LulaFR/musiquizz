import { Component } from '@angular/core';
import { Game } from '../../../entities/game';
import { Round } from '../../../entities/round';
import { GameService } from '../../../services/game.service';
import { OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { RoundComponent } from '../round/round.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RoundComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  constructor(private gameService: GameService, private router: Router) {}
  
  game: Game = {
    rounds: []
  }

  score: number = 0;

  currentRound: number = 0;

  btnMsg: string = 'Siguiente';

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
      this.gameService.setScore(this.score); //guardo el score final
      this.btnMsg = 'Ver resultados'
      alert('Fin del juego ' + this.score);
    }
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}
