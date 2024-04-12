import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  return loginService.userLoginOn;
};
