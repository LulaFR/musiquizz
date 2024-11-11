import { Component, EventEmitter, inject } from '@angular/core';
// import { RouterOutlet, RouterLink } from '@angular/router';
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
    accessToken: '',
    topRanking: []
  }
  
  @Output()
  private eventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(private userService: UserService) {}

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      id: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    }
  );


  logIn() {
    if(this.form.invalid) {
      alert('Chequeá que los campos estén llenos y estén entre los 5 y 20 caracteres'); 
      //comprobar qué está mal
      return;
    }

    // alert('paso');

    //es válido
    //buscar en el json de usuarios un usuario con el id ingresado
    this.getUser();
  }

  getUser() {
    // alert('obtener usuario');
    this.userService.getUser(this.form.getRawValue().id).subscribe(
      {
        next: (user) => {
          if(user) {
            this.user = user;
            console.log(user);
            this.checkPassword();
          }
        },
        error: (error: Error) => {
          console.log('Error al intentar obtener el usuario: ' + error);
        }
      });
    }


  checkPassword() {
    // alert('check password')
    if (this.user.password == this.form.getRawValue().password) {
      // alert('Ingresando...');
      this.emitUser();
      this.userService.setActiveUser(this.user);
    } else {
      alert('El usuario o la contraseña son incorrectos');
    }
  }

  emitUser() {
    this.eventEmitter.emit({...this.user});
  }
}