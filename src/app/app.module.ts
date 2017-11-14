import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { UserService } from './user.service';
import { AuthService } from './auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AuthSignUpComponent } from './auth-sign-up/auth-sign-up.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UsersComponent,
    UserDetailsComponent,
    AuthSignUpComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    CookieModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
