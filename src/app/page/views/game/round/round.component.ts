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

  chooseOption(id: string) {
    if (id === this.round.question.id) {
      alert('¡¡Respuesta correcta!!');
      this.score = 10;
    } else {
      alert('Opción incorrecta. Respuesta correcta: ' + this.round.question.name);
    }
  }

  ngOnChanges(): void {
    this.updateAudioSrc();
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
