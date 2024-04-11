import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Book } from '../../interfaces/book';
import { BookCardComponent } from '../../nav/book-card/book-card.component';
import { ErrorMessageComponent } from '../../nav/error-message/error-message.component';

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
  
  constructor(private service: BooksService){

  }

    ngOnInit(): void {
        this.books$ = this.service.getAllBooks().pipe(catchError((error:string)=>{
          this.errorMessage = error;
          return EMPTY;
        }));
    }
}
