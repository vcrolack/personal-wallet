import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateBudgetRequest } from '../requests/budgets/create-budget.request';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Budget } from '../interfaces/budget.interface';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

import { BudgetDetail } from '../responses/find-one-budget.response';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private endpoint = 'budgets';

  public create(body: CreateBudgetRequest): Observable<ApiResponse<Budget>> {
    return this.http
      .post<ApiResponse<Budget>>(
        `${environment.merakiUrl}/${this.endpoint}/create`,
        body
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public findAll(limit: number = 10, offset: number = 0) {
    const params = new HttpParams().set('limit', limit).set('offset', offset);

    return this.http
      .get<ApiResponse<Budget[]>>(
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

  public findOne(id: string): Observable<ApiResponse<BudgetDetail>> {
    return this.http
      .get<ApiResponse<BudgetDetail>>(
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
