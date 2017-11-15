import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User, NewUser } from '../user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../auth/auth.component.css', './users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[];
  newUser: NewUser;

  constructor(
    public authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  initNewUser(): void {
    this.newUser = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  getUsers(): void {
    if (this.authService.loginChecked) {
      if (this.authService.loggedIn) {
        this.userService.getUsers()
            .subscribe(users => this.users = users);
      }
    } else {
      setTimeout(_ => this.getUsers(), 100);
    }
  }

  addUser(): void {
    this.userService.addUser(this.newUser)
        .subscribe(user => {
          if (user) {
            this.users.push(user);
            this.newUser = null;
          }
        });
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
