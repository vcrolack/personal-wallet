import type {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorMapperService } from './error-mapper.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorMapper = inject(ErrorMapperService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const appError = errorMapper.mapHttpError(error);
      console.log('[ErrorInterceptor] Error: ', error);
      return throwError(() => appError);
    }),
  );
};
