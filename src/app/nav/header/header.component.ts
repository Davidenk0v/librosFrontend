import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
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
      );
  }

  logout(){
    this.loginService.logout()
  }
}
