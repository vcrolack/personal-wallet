import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WrapperComponent } from '@common/components/ui';
import { TransactionsList } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/components/transactions-list/transactions-list.component';
import { TransactionsResume } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/components/transactions-resume/transactions-resume.component';

@Component({
  selector: 'app-budget-transactions',
  imports: [WrapperComponent, TransactionsList, TransactionsResume],
  templateUrl: './budget-transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTransactions {}
