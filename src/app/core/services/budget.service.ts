import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateBudgetRequest } from '../requests/budgets/create-budget.request';
import { UpdateBudgetRequest } from '../requests/budgets/update-budget.request';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Budget } from '../interfaces/budget.interface';
import { environment } from '../../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { BudgetMapperService } from '../mappers/budget-mapper.service';
import { FullBudgetDTO } from '../dtos/budgets/compose-definitions/full-budget.dto';
import { BudgetModel } from '../models/budgets/budget.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { Metadata } from '../dtos/metadata.dto';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private mapper = inject(BudgetMapperService);
  private endpoint = 'budgets';

  // UI DATA MANAGEMENT //

  private refreshListTrigger = signal<number>(0);
  public paginationParams = signal({ limit: 10, page: 1 });

  public budgetResourceList = rxResource({
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

  private budgetIdTrigger = signal<string | undefined>(undefined);
  private detailVersion = signal<number>(0);

  public budgetResourceDetail = rxResource({
    params: () => {
      const id = this.budgetIdTrigger();
      if (!id) return undefined;
      return { id, version: this.detailVersion() };
    },
    stream: ({ params }) => {
      if (!params) return of(null as any);
      return this.findOne(params.id);
    },
  });

  public reloadList() {
    this.refreshListTrigger.update((prev) => prev + 1);
  }

  public reloadDetail() {
    this.detailVersion.update((prev) => prev + 1);
  }

  public selectBudget(id: string) {
    this.budgetIdTrigger.set(id);
  }

  // HTTP METHODS //

  public update(
    id: string,
    body: UpdateBudgetRequest,
  ): Observable<ApiResponse<Budget>> {
    return this.http.patch<ApiResponse<Budget>>(
      `${environment.merakiUrl}/${this.endpoint}/update/${id}`,
      body,
    );
  }

  public create(body: CreateBudgetRequest): Observable<ApiResponse<Budget>> {
    return this.http
      .post<
        ApiResponse<Budget>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, body)
      .pipe();
  }

  public findAll(
    limit: number = 10,
    page: number = 1,
  ): Observable<{ data: BudgetModel[]; meta?: Metadata }> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http
      .get<
        ApiResponse<FullBudgetDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<FullBudgetDTO[]>) => ({
          data: response.data.map((budget) => this.mapper.toModel(budget)),
          meta: response.meta,
        })),
      );
  }

  public findOne(id: string): Observable<BudgetModel> {
    return this.http
      .get<
        ApiResponse<FullBudgetDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/find-one/${id}`)
      .pipe(
        map((response: ApiResponse<FullBudgetDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public delete(id: string): Observable<{ message: string }> {
    return this.http.delete<ApiResponse<{ message: string }>>(
      `${environment.merakiUrl}/${this.endpoint}/delete/${id}`,
    );
  }
}
