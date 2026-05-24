import { inject, Injectable, OnInit } from '@angular/core';

import { TransactionsService } from '@core/services';

@Injectable()
export class BudgetTransactionsViewService {
  private transactionsService = inject(TransactionsService);

  public transactions = this.transactionsService.transactionsResourceList.value;
  public isLoading =
    this.transactionsService.transactionsResourceList.isLoading;
  public reloadList = this.transactionsService.reloadList;

  public getTransactionsByBudgetId(budgetId: string | null) {
    this.transactionsService.budgetIdParam.set(budgetId);
  }
}
