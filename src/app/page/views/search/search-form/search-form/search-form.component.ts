import { Component, EventEmitter, inject } from '@angular/core';
// import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {

  @Input()
  gameMode : string = 'Buscar';

  @Output()
  eventEmitter = new EventEmitter<string>();

  private inputContent: string = '';

  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group(
    {
      search: ['', [Validators.required]]
    }
  );

  search() {
    if (this.form.invalid) {
      console.log('FORM INVÁLIDO')
      return;
    }

    console.log('Entro a search()');
    // this.inputContent = this.form.getRawValue().search;
    // this.eventEmitter.emit(this.inputContent);
    this.eventEmitter.emit(this.form.getRawValue().search);
    //buscar
  }
}
