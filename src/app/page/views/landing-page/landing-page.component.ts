import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Router, provideRouter, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActiveService } from '../../services/active.service';
import { ThisReceiver, Token } from '@angular/compiler';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LogInComponent, SignInComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{

  ngOnInit(): void {
    // this.authService.clearLocalStorage();
    this.activeService.restoreActive().subscribe(
      {
        error: (error: Error) => {
          alert('Langing Page Error: ' + error);
        }
      }
    )
  }

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private activeService: ActiveService) {}

  //ATRIBUToS-------------------------------------------------------------------------------------------------------

  private user: User = {
    id: '',
    password: '',
    topRanking: []
  }
  
  disableLogIn: boolean = false;
  disableSignIn: boolean = true;
  
  //MÉTODOS...-------------------------------------------------------------------------------------------------------

  //Recibo el user desde log in
  logIn(user: User) {
    if (user) {
      this.user = user;
      //pido el access token
      this.authService.getAccessToken().subscribe(
        {
          next: (response) => {
            // this.authService.setActiveUser(user);
            // this.authService.setToken(response.access_token);
            this.activeService.patchActive({userId: this.user.id, token: response.access_token}).subscribe(
              {
                error: (error: Error) => {
                  alert('Landing Page Error: ' + error);
                }
              }
            )
            this.router.navigate(['/menu']);
          },
          error: (error: Error) => {
            alert('Hubo un error al intentar ingresar');
            console.log('Get Access Token Error: ' +error);
            return;
          }
        }
      )
    }
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
