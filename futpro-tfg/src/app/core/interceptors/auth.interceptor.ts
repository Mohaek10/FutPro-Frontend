import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

import {jwtDecode} from 'jwt-decode'
import {Router} from "@angular/router";
import {EMPTY} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  const accessToken = inject(AuthService).getTokens().access;
  if (accessToken) {
    try {
      let decodedToken = jwtDecode(accessToken);
      const isExpired =
        decodedToken && decodedToken.exp
          ? decodedToken.exp <= Math.floor(Date.now() / 1000)
          : false;
      if (isExpired) {
        console.log('Token caducado');
        inject(AuthService).removeTokens();
        router.navigate(['/login']);
        return EMPTY;
      } else {
        console.log('Token valido');
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });
        return next(authReq);
      }
    } catch (e) {
      console.error('Error al decodificar el token', e);
      inject(AuthService).removeTokens();
      router.navigate(['/login']);
      return next(req);
    }
  } else {
    console.log('No hay token en el localstorage')
    return next(req);
  }
};
