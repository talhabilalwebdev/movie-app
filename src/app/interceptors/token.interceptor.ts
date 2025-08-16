import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getCurrentUser();

  // Check token validity
  if (currentUser?.token && !authService.validateToken()) {
    authService.logout();
    router.navigate(['/login']);
    return throwError(() => new Error('Token expired or invalid'));
  }

  // Attach token if exists
  const clonedReq = currentUser?.token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
    : req;

  return next(clonedReq).pipe(
    catchError((err) => {
      if ((err as any).status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
