import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../interfaces/loginRequets';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}
  errorMessage:string = '';
  loginForm= this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['', [Validators.required]]
  })

  get email(){
    return this.loginForm.controls.email;
   }
 
   get password(){
     return this.loginForm.controls.password;
   }

  login(){
    if(this.loginForm.valid){;
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData.body)
        },
        error: (errorData)=>{
          this.errorMessage=errorData;
        },
        complete: ()=>{
          console.log('Login completo')
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      });

    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
