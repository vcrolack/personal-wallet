import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

import { map, Observable, of } from 'rxjs';

import { CreateTransactionRequest } from '@core/requests';
import {
  TransactionMapperService,
  TransactionsSummaryMapper,
} from '@core/mappers';
import { ExpensesByCategoryModel, TransactionModel } from '@core/models';
import { ApiResponse } from '@core/interfaces';
import {
  BudgetTransactionsSummaryDTO,
  GetExpensesByCategoryDTO,
  Metadata,
  TransactionDTO,
} from '@core/dtos';
import { environment } from '@env/environment';
import { ExpensesByCategoryMapperService } from '../../mappers/transaction/expenses-by-category-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);
  private mapper = inject(TransactionMapperService);
  private transactionsSummaryMapper = inject(TransactionsSummaryMapper);
  private expensesByCategoryMapper = inject(ExpensesByCategoryMapperService);
  private endpoint = 'transactions';
  private bffEndpoint = 'transactions-summary';

  // UI DATA MANAGEMENT //

  private refreshListTrigger = signal<number>(0);
  public paginationParams = signal({ limit: 1000, page: 1 });
  public budgetIdParam = signal<string | null>(null);

  public transactionsResourceList = rxResource({
    params: () => ({
      ...this.paginationParams(),
      budgetId: this.budgetIdParam(),
      version: this.refreshListTrigger(),
    }),
    stream: ({ params }) => {
      return this.findAll(
        params.limit,
        params.page,
        params.budgetId ?? undefined,
      );
    },
  });

  public transactionsSummaryResource = rxResource({
    params: () => ({
      budgetId: this.budgetIdParam(),
      version: this.refreshListTrigger(),
    }),
    stream: ({ params }) => {
      if (!params.budgetId) return of(null);
      return this.getBudgetTransactionsSummary(params.budgetId);
    },
  });

  public setPagination = (page: number, pageSize: number) => {
    this.paginationParams.set({
      limit: pageSize,
      page,
    });
  };

  public reloadList = () => {
    this.refreshListTrigger.update((value) => value + 1);
  };

  // HTTP METHODS

  public create(body: CreateTransactionRequest): Observable<TransactionModel> {
    return this.http
      .post<
        ApiResponse<TransactionDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, body)
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public findAll(
    limit: number = 10,
    page: number = 1,
    budgetId?: string,
  ): Observable<{ data: TransactionModel[]; meta?: Metadata }> {
    let params = new HttpParams().set('limit', limit).set('page', page);
    if (budgetId) {
      params = params.set('budgetId', budgetId);
    }
    return this.http
      .get<
        ApiResponse<TransactionDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<TransactionDTO[]>) => ({
          data: response.data.map((t) => this.mapper.toModel(t)),
          meta: response.meta,
        })),
      );
  }

  public findOne(id: string): Observable<TransactionModel> {
    return this.http
      .get<
        ApiResponse<TransactionDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/find-one/${id}`)
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public delete(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(
      `${environment.merakiUrl}/${this.endpoint}/delete/${id}`,
    );
  }

  // BFF METHODS
  public getBudgetTransactionsSummary(budgetId: string) {
    return this.http
      .get<
        ApiResponse<BudgetTransactionsSummaryDTO>
      >(`${environment.merakiBffUrl}/${this.bffEndpoint}/get-budget-transactions-summary/${budgetId}`)
      .pipe(
        map((response: ApiResponse<BudgetTransactionsSummaryDTO>) =>
          this.transactionsSummaryMapper.toModel(response.data),
        ),
      );
  }

  public getExpensesByCategory(budgetId: string) {
    return this.http
      .get<
        ApiResponse<GetExpensesByCategoryDTO>
      >(`${environment.merakiBffUrl}/${this.bffEndpoint}/get-expenses-by-category/${budgetId}`)
      .pipe(
        map((response: ApiResponse<GetExpensesByCategoryDTO>) =>
          this.expensesByCategoryMapper.toModel(response.data),
        ),
      );
  }
}
