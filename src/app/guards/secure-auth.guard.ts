import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const secureAuthGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  if (authSvc.getIsLoggedIn() !== true) {
    return router.navigate(['login']);
  }
  
  return true;
};
