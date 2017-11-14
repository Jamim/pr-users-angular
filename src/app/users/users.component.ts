import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User, NewUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[];
  newUser: NewUser;

  constructor(private userService: UserService) { }

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
    this.userService.getUsers()
        .subscribe(users => this.users = users);
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
