import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../interfaces/book';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  errorMessage:string="";
  book?:Book;

  constructor(private bookService:BooksService, private http: HttpClient){
    this.bookService.getBookById(1).subscribe({
      next: (bookData) => {
        this.book = bookData;
      },
      error: (errorData) => {
        this.errorMessage=errorData;
      },
      complete: ()=> {
        console.info("Book data ok");
      }
    });
  }

  
}
