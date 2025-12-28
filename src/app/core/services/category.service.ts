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
import { CreateCategoryRequest } from '../requests/categories/create-category.request';

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

  public create(
    category: CreateCategoryRequest
  ): Observable<ApiResponse<Category>> {
    return this.http
      .post<ApiResponse<Category>>(
        `${environment.merakiUrl}/${this.endpoint}/create`,
        category
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
