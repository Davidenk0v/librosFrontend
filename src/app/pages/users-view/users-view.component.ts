import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users/users.service';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../nav/error-message/error-message.component';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [AsyncPipe, ErrorMessageComponent],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css'
})
export class UsersViewComponent implements OnInit{

  public user$!: Observable<User[]>;
  public errorMessage!: string;

  constructor(private service: UsersService){}
  ngOnInit(): void {
      this.user$ = this.service.getAllUsers()
          .pipe(catchError((error:string)=> {
            this.errorMessage = error;
            return EMPTY;
          }))
  }
}
