import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateBudgetRequest } from '../requests/budgets/create-budget.request';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Budget } from '../interfaces/budget.interface';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BudgetMapperService } from '../mappers/budget-mapper.service';
import { FullBudgetDTO } from '../dtos/budgets/compose-definitions/full-budget.dto';
import { BudgetModel } from '../models/budgets/budget.model';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClient);
  private mapper = inject(BudgetMapperService);
  private endpoint = 'budgets';

  // UI DATA MANAGEMENT //

  private refreshListTrigger = signal<number>(0);
  public budgetResourceList = rxResource({
    request: () => ({
      limit: 10,
      offset: 0,
      version: this.refreshListTrigger(),
    }),
    loader: ({ request }) => {
      return this.findAll(request.limit, request.offset);
    },
  });

  private budgetIdTrigger = signal<string | undefined>(undefined);
  public budgetResourceDetail = rxResource({
    request: () => this.budgetIdTrigger(),
    loader: ({ request }) => this.findOne(request),
  });

  public reloadList() {
    this.refreshListTrigger.update((prev) => prev + 1);
  }

  public selectBudget(id: string) {
    this.budgetIdTrigger.set(id);
  }

  // HTTP METHODS //

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
