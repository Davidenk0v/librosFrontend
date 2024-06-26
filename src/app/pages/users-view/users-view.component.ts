import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users/users.service';
import { AsyncPipe } from '@angular/common';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [AsyncPipe, ErrorMessageComponent],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.css',
})
export class UsersViewComponent implements OnInit {
  public user$!: Observable<User[]>;
  public errorMessage!: string;

  constructor(private service: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.user$ = this.service.getAllUsers().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }

  deleteUserById(id: number) {
    console.log('eliminar');
    this.service.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        this.user$ = this.service.getAllUsers();
      },
    });
  }
}
