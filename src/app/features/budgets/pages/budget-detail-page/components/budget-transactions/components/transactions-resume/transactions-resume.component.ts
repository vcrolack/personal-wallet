import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { BudgetTransactionsSummaryModel } from '@core/models';
import { BudgetTransactionsViewService } from '@features/budgets/pages/budget-detail-page/services/budget-transactions-view.service';

@Component({
  selector: 'app-transactions-resume',
  imports: [],
  providers: [BudgetTransactionsViewService],
  templateUrl: './transactions-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsResume {
  private budgetTransactionsViewService = inject(BudgetTransactionsViewService);

  public budgetId = input.required<string>();
  public budgetTransactionsSummary =
    signal<BudgetTransactionsSummaryModel | null>(null);

  ngOnChanges(): void {
    this.budgetTransactionsViewService
      .getBudgetTransactionsSummary(this.budgetId())
      .subscribe((response) => {
        this.budgetTransactionsSummary.set(response);
      });
  }
}
