import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private endpoint = 'budget-categories';

  public findAll(
    limit: number = 10,
    offset: number = 0
  ): Observable<ApiResponse<Category[]>> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http
      .get<ApiResponse<Category[]>>(
        `${environment.merakiUrl}/${this.endpoint}/find-all`,
        { params }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
