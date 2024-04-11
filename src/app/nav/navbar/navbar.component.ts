import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userLoginOn:boolean=false;
  userData?:String;
  constructor(private loginService:LoginService){}

  ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe(
        {
          next:(userLoginOn) => {
            this.userLoginOn=userLoginOn;
          }
        }
      );

      this.loginService.currentUserData.subscribe(
        {
          next:(userData) => {
            this.userData=userData;
          }
        }
      )
  }
}
