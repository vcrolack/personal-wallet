import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { TransactionsList } from './components/transactions-list/transactions-list.component';
import { TransactionsResume } from './components/transactions-resume/transactions-resume.component';

@Component({
  selector: 'app-budget-transactions',
  imports: [WrapperComponent, TransactionsList, TransactionsResume],
  templateUrl: './budget-transactions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTransactions {}
