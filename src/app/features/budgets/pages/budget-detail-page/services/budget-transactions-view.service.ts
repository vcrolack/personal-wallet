import { inject, Injectable } from '@angular/core';

import { TransactionsService } from '@core/services';

@Injectable()
export class BudgetTransactionsViewService {
  private transactionsService = inject(TransactionsService);
  public reloadList = this.transactionsService.reloadList;

  public transactions = this.transactionsService.transactionsResourceList.value;
  public isLoading =
    this.transactionsService.transactionsResourceList.isLoading;

  public summary = this.transactionsService.transactionsSummaryResource.value;
  public isLoadingSummary =
    this.transactionsService.transactionsSummaryResource.isLoading;

  public expensesByCategory =
    this.transactionsService.expensesByCategoryResource.value;
  public isLoadingExpenses =
    this.transactionsService.expensesByCategoryResource.isLoading;

  public getTransactionsByBudgetId(budgetId: string | null) {
    this.transactionsService.budgetIdParam.set(budgetId);
  }
}
