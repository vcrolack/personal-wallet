import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { BudgetCategoryValue } from '../interfaces/budget-category-value.interface';
import { environment } from '../../../environments/environment';
import { CreateBudgetCategoryValue } from '../requests/budget-category-values/create-budget-category-value.request';
import { UpdateBudgetCategoryValueRequest } from '../requests/budget-category-values/update-budget-category-value.request';
import { CategoryValueMapperService } from '../mappers/category-value-mapper.service';
import { CategoryValueModel } from '../models/categories/category-value.model';
import { BudgetCategoryValueDTO } from '../dtos/budgets/base-definitions/budget-category-value.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryValuesService {
  private http = inject(HttpClient);
  private mapper = inject(CategoryValueMapperService);
  private endpoint = 'budget-category-values';

  public findAll(
    limit: number = 10,
    offset: number = 0,
    budgetCategoryId: number
  ): Observable<CategoryValueModel[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('budgetCategoryId', budgetCategoryId);

    return this.http
      .get<ApiResponse<BudgetCategoryValueDTO[]>>(
        `${environment.merakiUrl}/${this.endpoint}/find-all`,
        { params }
      )
      .pipe(
        map((response: ApiResponse<BudgetCategoryValueDTO[]>) =>
          response.data.map((categoryValue) =>
            this.mapper.toModel(categoryValue)
          )
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public findOne(id: number): Observable<CategoryValueModel> {
    return this.http
      .get<ApiResponse<BudgetCategoryValueDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/find-one/${id}`
      )
      .pipe(
        map((response) => this.mapper.toModel(response.data)),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public create(
    budgetCategoryValue: CreateBudgetCategoryValue
  ): Observable<CategoryValueModel> {
    return this.http
      .post<ApiResponse<BudgetCategoryValueDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/create`,
        budgetCategoryValue
      )
      .pipe(
        map((response) => this.mapper.toModel(response.data)),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public update(
    id: number,
    budgetCategoryValue: UpdateBudgetCategoryValueRequest
  ): Observable<CategoryValueModel> {
    return this.http
      .patch<ApiResponse<BudgetCategoryValueDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/update/${id}`,
        budgetCategoryValue
      )
      .pipe(
        map((response) => this.mapper.toModel(response.data)),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public delete(id: number): Observable<ApiResponse<{ message: string }>> {
    return this.http
      .delete<ApiResponse<{ message: string }>>(
        `${environment.merakiUrl}/${this.endpoint}/delete/${id}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
