import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {firstValueFrom} from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = await firstValueFrom(authService.isAdmin());

  if (authService.isAuthenticated() && isAdmin) {
    console.log('User is admin');
    return true;
  }
  console.log('User is not admin');

  await router.navigate(['/forbidden']);
  return false;
};
