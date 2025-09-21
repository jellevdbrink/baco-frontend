import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const tokenInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();

  let newReq = req;
  if (token) {
    newReq = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
  }

  return next(newReq).pipe(
    tap({
      error: (err) => {
        if (err.status === 401) {
          authService.logout();
          router.navigate(['/login']);
        }
      },
    }),
  );
};
