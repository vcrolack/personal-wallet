import { inject, Injectable } from '@angular/core';

import { TransactionsService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class BudgetTransactionsViewService {
  private transactionsService = inject(TransactionsService);
}
