import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(private lsService: LocalStorageService, private userService: UserService) {}

  user: User = {
    id: '',
    password:'',
    topRanking: []
  }

  ngOnInit(): void {
    const id = this.lsService.getActiveUser();
    if (id) {
      this.userService.getUser(id);
    } else {
      alert('User Component Error');
    }
  }

}
