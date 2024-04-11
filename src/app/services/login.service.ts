import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../interfaces/loginRequets';
import { evironment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http:HttpClient) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem('token')!= null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem('token') || '');
   }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(`${evironment.urlHost}auth/login`,credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.body)
        console.log(sessionStorage.getItem('token'));
        this.currentUserData.next(userData.body);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData),
      catchError(this.handleError)
    );
  }

  logout(){
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }


  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.error(error.error);
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
     return this.currentUserLoginOn.asObservable();
  }
}
