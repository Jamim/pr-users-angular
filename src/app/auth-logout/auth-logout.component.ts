import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout().subscribe(
      _ => {
        if (!this.authService.loggedIn) {
          this.goBack();
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
