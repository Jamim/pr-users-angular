import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NewUser } from '../user';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['../auth/auth.component.css']
})
export class AuthSignUpComponent implements OnInit {
  newUser: NewUser;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initNewUser();
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

  signUp(): void {
    this.authService.signUp(this.newUser).subscribe(
      _ => {
        if (this.authService.loggedIn) {
          this.initNewUser();
          this.router.navigateByUrl('/users');
        }
      }
    );
  }
}
