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
import { catchError, map, Observable, throwError } from 'rxjs';

import { BudgetDetail } from '../responses/find-one-budget.response';
import { BudgetMapperService } from '../mappers/budget-mapper.service';
import { FullBudgetDTO } from '../dtos/budgets/compose-definitions/full-budget.dto';
import { BudgetModel } from '../models/budgets/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private mapper = inject(BudgetMapperService);
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

  public findAll(
    limit: number = 10,
    offset: number = 0
  ): Observable<BudgetModel[]> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);

    return this.http
      .get<ApiResponse<FullBudgetDTO[]>>(
        `${environment.merakiUrl}/${this.endpoint}/find-all`,
        { params }
      )
      .pipe(
        map((response: ApiResponse<FullBudgetDTO[]>) =>
          response.data.map((budget) => this.mapper.toModel(budget))
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public findOne(id: string): Observable<BudgetModel> {
    return this.http
      .get<ApiResponse<FullBudgetDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/find-one/${id}`
      )
      .pipe(
        map((response: ApiResponse<FullBudgetDTO>) =>
          this.mapper.toModel(response.data)
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
