import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { CreateCategoryRequest } from '../requests/categories/create-category.request';
import { CategoryModel } from '../models/categories/category.model';
import { CategoryMapperService } from '../mappers/category-mapper.service';
import { BudgetCategoryDTO } from '../dtos/budgets/base-definitions/budget-category.dto';
import { rxResource } from '@angular/core/rxjs-interop';
import { UpdateCategoryRequest } from '../requests/categories/update-category.request';
import { Metadata } from '../dtos/metadata.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private mapper = inject(CategoryMapperService);
  private endpoint = 'budget-categories';

  // UI DATA MANAGEMENT

  private refreshListTrigger = signal<number>(0);
  public paginationParams = signal({ limit: 10, page: 1 });

  public categoryResource = rxResource({
    params: () => ({
      ...this.paginationParams(),
      version: this.refreshListTrigger(),
    }),
    stream: ({ params }) => {
      return this.findAll(params.limit, params.page);
    },
  });

  public setPagination(page: number, pageSize: number) {
    this.paginationParams.set({
      limit: pageSize,
      page,
    });
  }

  public reloadList() {
    this.refreshListTrigger.update((value) => value + 1);
  }

  // HTTP METHODS //

  public findAll(
    limit: number = 10,
    page: number = 1,
  ): Observable<{ data: CategoryModel[]; meta?: Metadata }> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http
      .get<
        ApiResponse<BudgetCategoryDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<BudgetCategoryDTO[]>) => ({
          data: response.data.map((category) => this.mapper.toModel(category)),
          meta: response.meta,
        })),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  public create(category: CreateCategoryRequest): Observable<CategoryModel> {
    return this.http
      .post<
        ApiResponse<BudgetCategoryDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, category)
      .pipe(
        map((response: ApiResponse<BudgetCategoryDTO>) =>
          this.mapper.toModel(response.data),
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  public update(
    id: number,
    body: UpdateCategoryRequest,
  ): Observable<CategoryModel> {
    return this.http
      .patch<
        ApiResponse<BudgetCategoryDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update/${id}`, body)
      .pipe(
        map((response: ApiResponse<BudgetCategoryDTO>) =>
          this.mapper.toModel(response.data),
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  public delete(id: number): Observable<{ message: string }> {
    return this.http
      .delete<
        ApiResponse<{ message: string }>
      >(`${environment.merakiUrl}/${this.endpoint}/delete/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
