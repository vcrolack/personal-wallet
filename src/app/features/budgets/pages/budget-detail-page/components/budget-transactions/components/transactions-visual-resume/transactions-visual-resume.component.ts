import { ChangeDetectionStrategy, Component } from '@angular/core';

import { WrapperComponent } from '@common/components/ui';
import { BudgetTransactionsViewService } from '@features/budgets/pages/budget-detail-page/services/budget-transactions-view.service';

@Component({
  selector: 'app-transactions-visual-resume',
  imports: [WrapperComponent],
  providers: [BudgetTransactionsViewService],
  templateUrl: './transactions-visual-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsVisualResume {}
