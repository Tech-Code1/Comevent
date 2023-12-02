import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus, LoginStateService } from '../../modules/auth';

export const PrivateGuard: CanActivateFn = async () => {
  const authService = inject(LoginStateService);
  const router = inject(Router);

  await authService.waitForInitialization();

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
