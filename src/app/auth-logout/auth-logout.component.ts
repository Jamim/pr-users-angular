import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout(
      login => {
        if (!login) {
          this.router.navigateByUrl('/auth');
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
