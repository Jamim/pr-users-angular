import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['../auth/auth.component.css']
})
export class AuthLoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      _ => {
        if (this.authService.loggedIn) {
          this.router.navigateByUrl('/users');
        }
      }
    );
  }
}
