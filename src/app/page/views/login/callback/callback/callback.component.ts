import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}

  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];

      if (code) {
        this.loginService.requestAccessToken(code).subscribe(
          {
            next: (response: any) => {
              console.log('Token de acceso:', response);
              // Guarda el token de acceso en el almacenamiento local o úsalo directamente.
              this.router.navigate(['/menu']);
            },
            error: (error: Error) => {
              console.error('Error al obtener el token:', error);
            }
          });
      }
    });
  }
}
