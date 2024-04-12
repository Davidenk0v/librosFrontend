import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { RegisterService } from '../../services/auth/register.service';
import { RegisterRequest } from '../../interfaces/registerRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService:RegisterService){}
  errorMessage:string = '';

  registerForm= this.formBuilder.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['', [Validators.required]]
  })

  register(){
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          this.router.navigateByUrl('/inicio');
        },
        error: (errorData)=>{
          this.errorMessage=errorData;
        },
        complete: ()=>{
          this.registerForm.reset();
        }
      });

    }else{
      this.registerForm.markAllAsTouched();
    }
      }
    }
