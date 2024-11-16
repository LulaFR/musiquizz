import { Component } from '@angular/core';
import { User } from '../../entities/user';
import { GameService } from '../../services/game.service';
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Ranking } from '../../entities/ranking';
import { ActiveService } from '../../services/active.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{

  constructor(private gameService: GameService, private lsService: LocalStorageService, private userService: UserService, private router: Router, private activeService: ActiveService) {}

  score: number = 0;
  gameMode: string = '';
  user: User = {
    id: '',
    password: '',
    topRanking: []
  }

  ngOnInit(): void {
    this.activeService.getActive().subscribe(
      {
        next: (response) => {
          this.getActiveUser(response.userId);
          this.score = response.newScore;
          this.gameMode = response.gameMode;
          console.log('INIT');
          // this.save();
        }
      }
    )
  }

  backToMenu() {
    // this.save();
    this.router.navigate(['/menu']);
  }
  
  playAgain() {
    // this.save();
    this.router.navigate(['/search']);
  }

  save() {
    console.log('SAVE');
    this.setOldRankings();
    this.arrangeRanking();
    if (this.user.id) {
      this.userService.putUser(this.user.id, this.user).subscribe(
        {
          error: (error: Error) => {
            alert('Save Error: ' + error);
          }
        }
      );
    }
  }

  arrangeRanking() {
    if (this.user.id && this.user.topRanking) {

      const ranking: Ranking = {
        score: this.score,
        gameMode: this.gameMode,
        new: true,
        userId: this.user.id
      }
      
      this.user.topRanking.push(ranking);

      if (this.user.topRanking.length > 1) {
        this.user.topRanking.sort((a,b) => b.score - a.score);
        
        if(this.user.topRanking.length > 3){
          this.user.topRanking.pop();
        }
      }
        
    }
   }
  
  getActiveUser(id: string) {
    if (id) {
      this.userService.getUser(id).subscribe(
        {
          next: (response) => {
            this.user = response;
            this.save();
          },
          error: (error: Error) => {
            alert('Results Error: ' + error);
          }
        }
      );
    }else {
      alert('Results Error: No se pudieron obtener los datos del usuario');
    }
  }

  setOldRankings() {
    console.log('Entro set old');
    if (this.user.topRanking) {
      console.log(this.user.topRanking.length);
      for (let index = 0; index < this.user.topRanking.length; index++) {
        this.user.topRanking[index].new = false;
        console.log('Entro set old if for');
        console.log(this.user.topRanking[index].score);
        console.log(this.user.topRanking[index].new);
      }
    }
  }

}
