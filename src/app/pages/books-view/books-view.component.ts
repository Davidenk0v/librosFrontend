import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Book } from '../../interfaces/book';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-books-view',
  standalone: true,
  imports: [AsyncPipe, BooksViewComponent, BookCardComponent, ErrorMessageComponent],
  templateUrl: './books-view.component.html',
  styleUrl: './books-view.component.css'
})
export class BooksViewComponent implements OnInit{

  public books$!: Observable<Book[]>;
  public errorMessage!: string;
  public book?: Book;
  
  constructor(private bookService: BooksService){

  }

    ngOnInit(): void {
        this.books$ = this.bookService.getAllBooks().pipe(catchError((error:string)=>{
          this.errorMessage = error;
          return EMPTY;
        }));
    }
}
