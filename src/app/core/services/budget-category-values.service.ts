import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { CreateBudgetCategoryValue } from '../requests/budget-category-values/create-budget-category-value.request';
import { UpdateBudgetCategoryValueRequest } from '../requests/budget-category-values/update-budget-category-value.request';
import { CategoryValueMapperService } from '../mappers/category-value-mapper.service';
import { CategoryValueModel } from '../models/categories/category-value.model';
import { BudgetCategoryValueDTO } from '../dtos/budgets/base-definitions/budget-category-value.dto';
import { rxResource } from '@angular/core/rxjs-interop';
import { Metadata } from '../dtos/metadata.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryValuesService {
  private http = inject(HttpClient);
  private mapper = inject(CategoryValueMapperService);
  private endpoint = 'budget-category-values';

  // UI DATA MANAGEMENT

  private categoryValueIdTrigger = signal<number | undefined>(undefined);
  public paginationParams = signal({ limit: 10, page: 1 });
  public searchTerm = signal('');

  public categoryValuesResource = rxResource({
    params: () => {
      const budgetCategoryId = this.categoryValueIdTrigger();
      if (!budgetCategoryId) return undefined;

      return {
        ...this.paginationParams(),
        budgetCategoryId,
        query: this.searchTerm(),
      };
    },
    stream: ({ params }) => {
      if (!params) return of({ data: [], meta: undefined });

      return this.findAll(
        params.limit,
        params.page,
        params.budgetCategoryId,
        params.query,
      );
    },
  });

  public setPagination(page: number, pageSize: number) {
    this.paginationParams.set({
      limit: pageSize,
      page,
    });
  }

  public search(term: string) {
    this.searchTerm.set(term);
    this.paginationParams.set({ limit: 10, page: 1 });
  }

  public selectCategory(id: number) {
    this.categoryValueIdTrigger.set(id);
    this.paginationParams.set({ limit: 10, page: 1 });
  }

  public reloadList() {
    this.categoryValuesResource.reload();
  }

  // HTTP METHODS //

  public findAll(
    limit: number = 10,
    page: number = 1,
    budgetCategoryId: number,
    query?: string,
  ): Observable<{ data: CategoryValueModel[]; meta?: Metadata }> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('budgetCategoryId', budgetCategoryId);

    if (query) params = params.set('query', query);

    return this.http
      .get<
        ApiResponse<BudgetCategoryValueDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<BudgetCategoryValueDTO[]>) => ({
          data: response.data.map((categoryValue) =>
            this.mapper.toModel(categoryValue),
          ),
          meta: response.meta,
        })),
      );
  }

  public findOne(id: number): Observable<CategoryValueModel> {
    return this.http
      .get<
        ApiResponse<BudgetCategoryValueDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/find-one/${id}`)
      .pipe(map((response) => this.mapper.toModel(response.data)));
  }

  public create(
    budgetCategoryValue: CreateBudgetCategoryValue,
  ): Observable<CategoryValueModel> {
    return this.http
      .post<
        ApiResponse<BudgetCategoryValueDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, budgetCategoryValue)
      .pipe(map((response) => this.mapper.toModel(response.data)));
  }

  public update(
    id: number,
    budgetCategoryValue: UpdateBudgetCategoryValueRequest,
  ): Observable<CategoryValueModel> {
    return this.http
      .patch<
        ApiResponse<BudgetCategoryValueDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update/${id}`, budgetCategoryValue)
      .pipe(map((response) => this.mapper.toModel(response.data)));
  }

  public delete(id: number): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(
      `${environment.merakiUrl}/${this.endpoint}/delete/${id}`,
    );
  }
}
