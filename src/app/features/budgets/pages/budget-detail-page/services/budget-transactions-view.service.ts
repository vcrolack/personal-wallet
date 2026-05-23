import { inject, Injectable } from '@angular/core';
import { TransactionsService } from '../../../../../core/services/transactions.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetTransactionsViewService {
  private transactionsService = inject(TransactionsService);
}
