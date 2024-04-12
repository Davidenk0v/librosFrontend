import { Component, Input } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../interfaces/book';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

  @Input() id:string = '';
  book?:Book;
  errorMessage?:string;

  constructor(private bookService:BooksService, private formBuilder:FormBuilder){}

    updateForm = this.formBuilder.group({
      title: [this.book?.title],
      author: [this.book?.author],
      category: [this.book?.category]
    })


    ngOnInit(): void {
      if(this.id){
        this.bookService.getBookById(parseInt(this.id)).subscribe({
          next: (bookData) => {
            this.book = bookData;
          },
          error: (errorData) => {
            this.errorMessage=errorData;
          },
          complete: ()=> {
            console.info(this.book);
          }
        });
      }
    }
}
