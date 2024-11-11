import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { Track } from '../../../entities/track';
import { Round } from '../../../entities/round';
import { Game } from '../../../entities/game';
import { OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-preparation',
  standalone: true,
  imports: [],
  templateUrl: './game-preparation.component.html',
  styleUrl: './game-preparation.component.css'
})
export class GamePreparationComponent implements OnInit{
  //HACER MÉTODO PARA MEZCLAR LAS OPCIONES EN UNA RONDA
  @Input()
  tracks: Track[] = [];

  // provisoryTracks: Track[] = this.tracks;
  provisoryTracks: Track[] = [];
  unselectedTracks: Track[] = [];

  @Input()
  totalTracks: number = 0;

  round: Round = {
    question: {
      id: '',
      name: '',
      preview: '',
      img: ''
    },
    options: []
  }

  game: Game = {
    rounds: []
  }

  provOptions: Track[] = [];

  ngOnInit(): void {
    // console.log('GAME OWOWOWOWOW: ' + this.tracks[4].id);
    this.unselectedTracks = [...this.tracks];
    this.generateGame();
  }

  constructor(private gameService: GameService, private router: Router) {}

  generateGame() {
    for (let index = 0; index < this.totalTracks; index++) {
      this.round.options = []; //limpio el array de opciones;
      // console.log('INDEX FOR: ' + index);
      this.provisoryTracks = [...this.tracks] //cargo el array de tracks provisorio
      this.selectQueryTrack(index); //se selecciona el track a adivinar
      this.getOptions(); //se seleccionar las otras opciones
      this.mixOptions();
      this.game.rounds.push({...this.round}); //coloco la ronda en el juego
    }
    this.saveGame();
    this.mostrar();
    this.startGame();
  }

  selectQueryTrack(i: number) {
    const index = this.getRandomIndex(this.totalTracks - i);
    // console.log('INDEX WOWOWOWOWO: ' + index);
    // console.log('NOMBRE WOWOWOOW: ' + this.tracks[index].name);
    this.round.question = this.unselectedTracks[index]; //track a adivinar
    this.round.options.push({...this.unselectedTracks[index]}); //se coloca la respuesta correcta entre las opciones
    this.removeChosenTrack(this.unselectedTracks[index].id); //se elimina el track del array provisorio para no volver
  }                                                //a elegirlo en otra ronda

  removeChosenTrack(id: string) {
    this.provisoryTracks = this.provisoryTracks.filter((track) => track.id != id); //me quedo con todos menos con
                                                                                //el track con el id especificado
    this.unselectedTracks = this.unselectedTracks.filter((track) => track.id != id); //elimino el track elegido
    // this.mostrarUnselected();
  }                                                                     //del array de tracks no seleccionados
  
  removeChosenOption(id: string) {
    this.provisoryTracks = this.provisoryTracks.filter((track) => track.id != id); //me quedo con todos menos con
  }                                                                             //el track con el id especificado

  getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  getOptions() {
    for (let index = 0; index < 3; index++) {
      const i = this.getRandomIndex(this.totalTracks - (index + 1)); //obtengo un index random
      this.round.options.push({...this.provisoryTracks[i]}); //coloco el track en ese index entre las opciones
      this.removeChosenOption(this.provisoryTracks[i].id); //elimino ese track del array provisorio
    }
  }

  mostrar() {
    for (let index = 0; index < this.game.rounds.length; index++) {
      console.log('RONDA ' + index);
      console.log('Canción: ' + this.game.rounds[index].question.name);
      for (let index2 = 0; index2 < 4; index2++) {
        console.log('Opción ' + (index2 + 1) + ': ' + this.game.rounds[index].options[index2].name);
      }
      console.log('============================')
    }
  }

  // mostrarUnselected() {
  //   console.log('UNSELECTED WOWOWOWOWOOWW');
  //   this.unselectedTracks.map((track) => console.log(track.name));
  // }

  mixOptions() {
    const op = [0, 1, 2, 3];
    for (let index = 0; index < 4; index++) {
      let i = this.getRandomIndex(4 - index);
      this.provOptions.push({...this.round.options[i]});
      this.round.options = this.round.options.filter((track) => track.id != this.round.options[i].id);
    }
    this.round.options = [...this.provOptions];
    this.provOptions = [];
  }

  saveGame() {
    this.gameService.setGame(this.game);
  }

  startGame() {
    this.router.navigate(['/play']);
  }
}
