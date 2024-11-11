import { Component } from '@angular/core';
import { User } from '../../entities/user';
import { GameService } from '../../services/game.service';
import { OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{

  constructor(private gameService: GameService, private lsService: LocalStorageService, private userService: UserService) {}

  score: number = 0;
  user: User = {
    id: '',
    password: '',
    topRanking: []
  }

  ngOnInit(): void {
    this.gameService.getScore().subscribe(
      {
        next: (response) => {
          this.score = response;
        },
        error: (error: Error) => {
          alert('Results Component Error: ' + error);
        }
      });
    const id = this.lsService.getActiveUser();
    if (id) {
      this.userService.getUser(id).subscribe(
        {
          next: (response) => {
            this.user = response;
          },
          error: (error: Error) => {
            alert('Results Component Error: ' + error);
          }
        }
      );
    }else {
      alert('Results Component Error: Error al intentar obtener los datos del usuario');
    }
  }

}
