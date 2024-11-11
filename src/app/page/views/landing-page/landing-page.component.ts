import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Router, provideRouter, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LogInComponent, SignInComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  ngOnInit(): void {
    this.authService.clearLocalStorage();
  }

  private user: User = {
    id: '',
    password: '',
    accessToken: '',
    topRanking: []
  }

  disableLogIn: boolean = false;
  disableSignIn: boolean = true;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  //Recibo el user desde log in
  logIn(user: User) {
    if (user) {
      this.user = user;
      //pido el access token
    this.authService.getAccessToken().subscribe(
      {
        next: (response) => {
          console.log(response);
          // this.user.accessToken = response; //asigno el access token al objeto de at
          this.authService.setActiveUser(user.id);
          console.log('Usuario activo: ' + this.authService.getActiveUser());
          console.log('RESPONSE:' + response.access_token);
          this.authService.setToken(response.access_token);
          this.router.navigate(['/menu']);
        },
        error: (error: Error) => {
          alert('Hubo un error al intentar ingresar');
          console.log('Error: ' +error);
          return;
        }
      }
    )
  }
    //Se asigna un usuario activo y su access token
    //Se va a tener q pasar el usuario a través de la ruta con query Params(creo)
    // this.userService.setActiveUser(user);
    // this.userService.setAccessToken(this.accessToken.accessToken);
  }

  activateLogIn() {
    this.disableLogIn = false;
    this.disableSignIn = true;
  }

  activateSignIn() {
    this.disableLogIn = true;
    this.disableSignIn = false;
  }
}
