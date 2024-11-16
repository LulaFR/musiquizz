import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';
import { ActiveService } from '../../services/active.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(private lsService: LocalStorageService, private userService: UserService, private activeService: ActiveService, private router: Router) {}

  user: User = {
    id: '',
    password:'',
    topRanking: []
  }

  ngOnInit(): void {
    this.activeService.getActive().subscribe(
      {
        next: (response) => {
          this.getUser(response.userId);
        },
        error: (error: Error) => {
          alert('User Init Error: ' + error);
        }
      }
    )
  }

  getUser(id: string) {
    this.userService.getUser(id).subscribe(
      {
        next: (response) => {
          this.user = response;
        },
        error: (error: Error) => {
          alert('Get User Error: ' + error);
        }
      }
    )
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
  
  logOut() {
    this.router.navigate(['/landing']);
  }

}
