import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.isAuthenticated()) {
    if (service.isTokenExpired()) {
      service.logout();
      return false;
    } else {
      return true;
    }

  } else {
    router.navigate(['/login']);
    return false;
  }

};
