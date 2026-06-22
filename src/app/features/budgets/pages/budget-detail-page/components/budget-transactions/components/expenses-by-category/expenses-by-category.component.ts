import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BudgetTransactionsViewService } from '../../../../services/budget-transactions-view.service';

@Component({
  selector: 'app-expenses-by-category',
  imports: [CommonModule, NgClass, CurrencyPipe],
  templateUrl: './expenses-by-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesByCategory {
  private budgetTransactionsViewService = inject(BudgetTransactionsViewService);

  public expensesByCategory =
    this.budgetTransactionsViewService.expensesByCategory;
  public isLoadingExpenses =
    this.budgetTransactionsViewService.isLoadingExpenses;

  public totalUnbudgeted = computed(() => {
    const data = this.expensesByCategory();
    if (!data) return 0;
    return data.unbudgetedExpenses.reduce((sum, u) => sum + u.totalSpent, 0);
  });

  public mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
