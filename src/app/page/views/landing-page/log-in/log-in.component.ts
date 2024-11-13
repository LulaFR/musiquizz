import { Component, EventEmitter, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { Output } from '@angular/core';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  user: User = {
    id: '',
    password: '',
    topRanking: []
  }
  
  @Output()
  private eventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(private userService: UserService) {}

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      id: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
  );


  logIn() {
    if(this.form.invalid) {
      alert('Completar campos'); 
      return;
    }

    //es válido
    //buscar en el json de usuarios un usuario con el id ingresado
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.form.getRawValue().id).subscribe(
      {
        next: (user) => {
          if(user) {
            this.user = user;
            this.checkPassword();
          }
        },
        error: (error: Error) => {
          alert(error);
        }
      });
    }


  checkPassword() {
    if (this.user.password == this.form.getRawValue().password) {
      // this.userService.setActiveUser(this.user);
      this.emitUser();
    } else {
      alert('El usuario o la contraseña son incorrectos');
    }
  }

  emitUser() {
    this.eventEmitter.emit({...this.user});
  }
}