import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Book } from '../../interfaces/book';
import { evironment } from '../../../environment/environment';
import { UpdateBookRequest } from '../../interfaces/updateBookRequest';
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }

  updateBook(id:number,credentials:UpdateBookRequest): Observable<any>{
    return this.http.put<any>(`${evironment.urlApi}/books/${id}`,credentials)
    .pipe(tap((response)=> {
      console.log(response);
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Error: ", error.error));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
}
