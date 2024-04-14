import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {

  book?:Book;
  errorMessage?:string;
  constructor(private bookService:BooksService){}

  @Input() bookInfo!: Book;

  booInfo(id:number){
    this.bookService.getBookById(id).subscribe({
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
