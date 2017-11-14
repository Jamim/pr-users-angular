import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpMode = true;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  setMode(mode: boolean): void {
    this.signUpMode = mode;
  }
}
