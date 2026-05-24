import { inject, Injectable, OnInit } from '@angular/core';

import { TransactionsService } from '@core/services';

@Injectable()
export class BudgetTransactionsViewService {
  private transactionsService = inject(TransactionsService);

  public transactions = this.transactionsService.transactionsResourceList.value;
  public isLoading =
    this.transactionsService.transactionsResourceList.isLoading;
  public pagination = this.transactionsService.paginationParams.asReadonly();

  public getTransactionsByBudgetId(budgetId: string | null) {
    this.transactionsService.budgetIdParam.set(budgetId);
  }

  public goToPage(page: number) {
    if (page < 1) return;
    this.transactionsService.paginationParams.update((p) => ({ ...p, page }));
  }
}
