import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../interfaces/user';
import { RegisterService } from '../../services/auth/register.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  userData?: String;
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    //Login
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
    //Register
    this.registerService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
      },
    });
    this.registerService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  logout() {
    this.loginService.logout();
  }
}
