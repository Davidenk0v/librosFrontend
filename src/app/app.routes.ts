import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { BooksViewComponent } from './pages/books-view/books-view.component';
import { UsersViewComponent } from './pages/users-view/users-view.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: IndexComponent},
    {path: 'nuevo-usuario', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'libros', component: BooksViewComponent, canActivate: [authGuardGuard]},
    {path: 'usuarios', component: UsersViewComponent, canActivate: [authGuardGuard]},
    {path: 'libro/:id', component: BookDetailComponent, canActivate: [authGuardGuard]}
];
