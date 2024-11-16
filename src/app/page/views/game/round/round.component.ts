import { Component, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Round } from '../../../entities/round';
import { CommonModule } from '@angular/common';
import { OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round.component.html',
  styleUrl: './round.component.css'
})
export class RoundComponent implements OnChanges{

  constructor(private router: Router) {}

  //ATRIBUTOS--------------------------------------------------------------------------------------------------------

  @Input()
  round: Round = {
    question: {
      id: '',
      name: '',
      preview: '',
      img: '',
    },
    options: []
  }

  @Output()
  roundCompleted = new EventEmitter<number>();

  audioSrc: string | null = null;

  @Input()
  btnMsg: string = 'Siguiente';

  @Output()
  score: number = 0;

  @Input()
  lastRound: boolean = false;

  disabledOpt: boolean = false;
  disabledNext: boolean = true;

  option1: boolean = false;
  option2: boolean = false;
  option3: boolean = false;
  option4: boolean = false;

  //MÉTODOS-----------------------------------------------------------------------------------------------------------

  chooseOption(id: string, option: number) {
    this.score = 0;
    if (id === this.round.question.id) {
      this.showAnswer(true, option);
      // alert('¡¡Respuesta correcta!!');
      this.score = 10;
    } else {
      // this.showAnswer(false, option);
      alert('Opción incorrecta. Respuesta correcta: ' + this.round.question.name);
    }
    this.disabledOpt = true;
    this.disabledNext = false;
  }

  showAnswer(correct: boolean, option: number) {
    if(correct) {
      if (option == 1) {
        this.option1 = true;
      } else if (option == 2) {
        this.option2 = true;
      } else if (option == 3) {
        this.option3 = true;
      } else if (option == 4) {
        this.option4 = true;
      }
    }
  }


  ngOnChanges(): void {
    if (!this.lastRound) {
      this.updateAudioSrc();
      this.disabledOpt = false;
      this.disabledNext = true
    }
    this.option1 = false;
    this.option2 = false;
    this.option3 = false;
    this.option4 = false;
  }

  updateAudioSrc() {
    this.audioSrc = null;
    setTimeout(() => {
      this.audioSrc = this.round.question.preview;
    }, 0);
  }

  next() {
    setTimeout(()=> {
      this.roundCompleted.emit(this.score);
    }, 0);
  }

  seeResults() {
    this.router.navigate(['/results']);
  }
}
