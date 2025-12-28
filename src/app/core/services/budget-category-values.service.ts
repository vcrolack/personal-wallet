import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { BudgetCategoryValue } from '../interfaces/budget-category-value.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryValuesService {
  private http = inject(HttpClient);
  private endpoint = 'budget-category-values';

  public findAll(
    limit: number = 10,
    offset: number = 0,
    budgetCategoryId: number
  ): Observable<ApiResponse<BudgetCategoryValue[]>> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('budgetCategoryId', budgetCategoryId);
    return this.http
      .get<ApiResponse<BudgetCategoryValue[]>>(
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

  public findOne(id: number): Observable<ApiResponse<BudgetCategoryValue>> {
    return this.http
      .get<ApiResponse<BudgetCategoryValue>>(
        `${environment.merakiUrl}/${this.endpoint}/find-one/${id}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
