import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { CreateCategoryRequest } from '../requests/categories/create-category.request';
import { CategoryModel } from '../models/categories/category.model';
import { CategoryMapperService } from '../mappers/category-mapper.service';
import { BudgetCategoryDTO } from '../dtos/budgets/base-definitions/budget-category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private mapper = inject(CategoryMapperService);
  private endpoint = 'budget-categories';

  public findAll(
    limit: number = 10,
    offset: number = 0
  ): Observable<CategoryModel[]> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http
      .get<ApiResponse<BudgetCategoryDTO[]>>(
        `${environment.merakiUrl}/${this.endpoint}/find-all`,
        { params }
      )
      .pipe(
        map((response: ApiResponse<BudgetCategoryDTO[]>) =>
          response.data.map((category) => this.mapper.toModel(category))
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public create(category: CreateCategoryRequest): Observable<CategoryModel> {
    return this.http
      .post<ApiResponse<BudgetCategoryDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/create`,
        category
      )
      .pipe(
        map((response: ApiResponse<BudgetCategoryDTO>) =>
          this.mapper.toModel(response.data)
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
