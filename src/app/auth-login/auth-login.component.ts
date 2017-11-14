import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      _ => {
        if (this.authService.loggedIn) {
          this.goBack();
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
