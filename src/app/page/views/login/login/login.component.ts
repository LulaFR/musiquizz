import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Location } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}


  private location = inject(Location);
  currentPath : string = '';
  authCode: string = '';

  logUser() { //se termina de ejecutar antes de redireccionarse a spotify
    this.authCode = this.loginService.requestAuthorization().slice(6);
    this.currentPath = this.location.path();
    console.log('LLEGO');
    console.log(this.currentPath);
  }

  authorize() {
    window.location.href = this.loginService.getAuthUrl();
  }

  getAccessToken(){
    this.loginService.getAccessToken().subscribe(
      {
        next: (response) => {
          console.log('Access Token:', response.access_token);
        },
        error: (error: Error) => {
          console.error('Error al obtener el token:', error);
        }
    });
  }

  login() {
    
  }

  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group(
    {
      user: '',
      password: ''
    }
  );

}
