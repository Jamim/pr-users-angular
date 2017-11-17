import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../auth/auth.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: User;
  isCurrent: boolean;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.subscription = this.router.events.filter(
      event => event instanceof NavigationEnd
    ).subscribe(event => this.getUser());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        this.isCurrent = this.authService.currentLogin.id === user.id;
      });
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
