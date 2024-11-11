import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  user: User = {
    password: '',
    accessToken: '',
    topRanking: []
  }

  constructor(private userService: UserService, private router: Router) {}

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      id: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    }
  );

  @Output()
  private eventEmitter: EventEmitter<boolean> = new EventEmitter();


  signIn() {
    if(this.form.invalid) { //No cumple con las validaciones del form
      alert('Chequeá que los campos estén llenos y estén entre los 5 y 20 caracteres'); 
      //comprobar qué está mal
      return;
    }

    //el formulario es válido
    //se comprueba que no haya un usuario con el mismo username
    this.idExists();
  }

  idExists() {
    //se comprueba si el username ya está en uso
    this.userService.getUser(this.form.getRawValue().id).subscribe(
      {
        next: (user) => {
          if(user) {
            alert('Nombre de usuario existente');
          } else {
          }
        },
        error: () => {
          this.checkPasswords();
          // console.log('Error al intentar obtener el usuario: ' + error);
        }
      }
    )
  }

  checkPasswords() {
    //el username es válido
    //se comprueba que la contraseña y el reingreso de contraseña sean iguales
    if (this.form.getRawValue().password !== this.form.getRawValue().repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    } else {
      this.postUser();
    }
  }

  postUser() {
    //las contraseñas coinciden
    //se notifica, se guarda el usuario en el server y se cambia de sign in a log in
    
    this.user.id = this.form.getRawValue().id;
    this.user.password = this.form.getRawValue().password;
    
    this.userService.postUser(this.user).subscribe(
      {
        next: () => {
          alert('Se guardaron los datos con éxito');
          this.changeToLogIn();
          // this.router.navigate(['/log in']);
        },
        error: (error: Error) => {
          alert('Hubo un error al intentar guardar los cambios: ' + error);
        }
      }
    );
  }

  changeToLogIn() {
    this.eventEmitter.emit(true);
  }
}
