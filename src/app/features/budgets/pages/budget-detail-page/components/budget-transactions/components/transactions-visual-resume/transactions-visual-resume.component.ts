import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { WrapperComponent } from '@common/components/ui';
import { BudgetTransactionsViewService } from '@features/budgets/pages/budget-detail-page/services/budget-transactions-view.service';
import { BudgetTransactionsSummaryModel } from '@core/models/transaction/transactions-summary/budget-transactions-summary.model';

@Component({
  selector: 'app-transactions-visual-resume',
  imports: [WrapperComponent],
  providers: [BudgetTransactionsViewService],
  templateUrl: './transactions-visual-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsVisualResume {
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
