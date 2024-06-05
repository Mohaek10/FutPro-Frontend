import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(AuthService).getTokens().access;
  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(authReq);
  }
  return next(req);
};
