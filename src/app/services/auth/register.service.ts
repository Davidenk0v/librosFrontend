import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../../interfaces/user';
import { RegisterRequest } from '../../interfaces/registerRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');
  
  constructor(private http:HttpClient, private router:Router) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem('token')!= null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem('token') || '');
  }

  register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(`${evironment.urlHost}auth/register`, credentials)
    .pipe(tap((response) => {
      console.log(response);
      sessionStorage.setItem("token", response.token);
      this.currentUserData.next(response.token);
      this.currentUserLoginOn.next(true);
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }


  private handleError(error:HttpErrorResponse){
    if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Ya existe un usuario con ese username o email"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
  
}
