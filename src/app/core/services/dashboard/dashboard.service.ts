import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { DashboardResponse } from '@core/interfaces';
import { ApiResponse } from '@core/interfaces';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private endpoint = 'dashboard';

  // State
  private budgetIdTrigger = signal<string | undefined>(undefined);
  private datesTrigger = signal<{ startDate?: string; endDate?: string }>({});
  private refreshTrigger = signal<number>(0);

  public dashboardResource = rxResource({
    params: () => {
      const budgetId = this.budgetIdTrigger();
      if (!budgetId) return undefined;
      return {
        budgetId,
        ...this.datesTrigger(),
        version: this.refreshTrigger(),
      };
    },
    stream: ({ params }) => {
      if (!params) return of(null as any);
      return this.getDashboardSummary(
        params.budgetId,
        params.startDate,
        params.endDate,
      );
    },
  });

  public selectBudgetAndDates(
    budgetId: string,
    startDate?: string,
    endDate?: string,
  ) {
    this.budgetIdTrigger.set(budgetId);
    this.datesTrigger.set({ startDate, endDate });
  }

  public reload() {
    this.refreshTrigger.update((prev) => prev + 1);
  }

  public getDashboardSummary(
    budgetId: string,
    startDate?: string,
    endDate?: string,
  ): Observable<DashboardResponse> {
    let params = new HttpParams().set('budgetId', budgetId);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http
      .get<ApiResponse<DashboardResponse>>(
        `${environment.merakiBffUrl}/${this.endpoint}`,
        {
          params,
        },
      )
      .pipe(map((response) => response.data));
  }
}
