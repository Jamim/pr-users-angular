import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

import '../style/app.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  navbarCollapsed = true;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.checkLogin();
  }
}
