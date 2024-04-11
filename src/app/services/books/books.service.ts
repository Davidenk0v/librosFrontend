import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../../interfaces/book';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${evironment.urlApi}/books/`)
      .pipe(catchError((error: HttpErrorResponse) => {
        let errorMessage = "";

        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`;
        }else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

      return throwError(()=> errorMessage);
    }))
  }

  getBookById(id:number):Observable<Book>{
    return this.http.get<Book>(`${evironment.urlApi}/books/${id}`)
          .pipe(catchError((error: HttpErrorResponse) => {
            let errorMessage = "";
    
            if(error.error instanceof ErrorEvent){
              errorMessage = `Error: ${error.error.message}`;
            }else {
              errorMessage = `Error code: ${error.status}, message: ${error.message}`;
            }
    
          return throwError(()=> errorMessage);
        }))
  }

}
