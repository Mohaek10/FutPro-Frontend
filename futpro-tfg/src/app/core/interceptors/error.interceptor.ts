import {HttpInterceptorFn, HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (error.status === 400 && error.error && Array.isArray(error.error)) {
          errorMessage = error.error.join(' ');
        } else {
          errorMessage = `Error en el servidor con código ${error.status}, y el mensaje es:  ${error.message}`;
        }
      }

      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};
