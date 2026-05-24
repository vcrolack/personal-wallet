import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';

import { WrapperComponent } from '@common/components/ui';
import { TransactionsList } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/components/transactions-list/transactions-list.component';
import { TransactionsResume } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/components/transactions-resume/transactions-resume.component';
import { BudgetTransactionsViewService } from '../../services/budget-transactions-view.service';
import { TransactionsVisualResume } from './components/transactions-visual-resume/transactions-visual-resume.component';

@Component({
  selector: 'app-budget-transactions',
  imports: [
    WrapperComponent,
    TransactionsList,
    TransactionsResume,
    TransactionsVisualResume,
  ],
  providers: [BudgetTransactionsViewService],
  templateUrl: './budget-transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTransactions {
  private budgetTransactionsViewService = inject(BudgetTransactionsViewService);

  public budgetId = input.required<string>();

  public transactions = this.budgetTransactionsViewService.transactions;
  public isLoading = this.budgetTransactionsViewService.isLoading;
  public pagination = this.budgetTransactionsViewService.pagination;
  public goToPage = this.budgetTransactionsViewService.goToPage;

  constructor() {
    effect(() => {
      this.budgetTransactionsViewService.getTransactionsByBudgetId(
        this.budgetId(),
      );
    });
  }
}
