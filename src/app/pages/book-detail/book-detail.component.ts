import { Component, Input } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../interfaces/book';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UpdateService } from '../../services/books/update.service';
import { UpdateBookRequest } from '../../interfaces/updateBookRequest';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

  @Input() id:string = '';

  title?:string;
  urlImg?:string;

  succesMessage:string = '';
  errorMessage?:string;

  constructor(private router:Router, private bookService:BooksService, private formBuilder:FormBuilder, private updateService:UpdateService){}

    updateForm = this.formBuilder.group({
      title: [this.title],
      urlImg: [this.urlImg]
    })


    ngOnInit(): void {
      if(this.id){
        this.bookService.getBookById(parseInt(this.id)).subscribe({
          next: (bookData) => {
            this.title = bookData.title;
            this.urlImg = bookData.urlImg;
          },
          error: (errorData) => {
            this.errorMessage=errorData;
          },
          complete: ()=> {
            console.info("Libro cargado correctamente");
          }
        });
      }
    }

    updateBook(){
      
      this.updateService.updateBook(parseInt(this.id), this.updateForm.value as UpdateBookRequest).subscribe({
        next: (response) => {
            console.log(response);
        },
        error: (errorData) => {
          console.error(errorData)
        },
        complete: ()=> {
          this.succesMessage = "Libro actualizado correctamente"
        }
      });
    }
}
