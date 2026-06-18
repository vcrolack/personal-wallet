import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import {
  DonutChartComponent,
  DonutChartData,
  PieChartComponent,
  PieChartData,
} from '@common/components/charts';
import {
  CarouselComponent,
  CarouselSlideDirective,
  TextComponent,
  TitleComponent,
  WrapperComponent,
} from '@common/components/ui';
import { BudgetTransactionsViewService } from '@features/budgets/pages/budget-detail-page/services/budget-transactions-view.service';

@Component({
  selector: 'app-transactions-visual-resume',
  imports: [
    CommonModule,
    CurrencyPipe,
    WrapperComponent,
    CarouselComponent,
    CarouselSlideDirective,
    TitleComponent,
    TextComponent,
    DonutChartComponent,
    PieChartComponent,
  ],
  templateUrl: './transactions-visual-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsVisualResume {
  private viewService = inject(BudgetTransactionsViewService);

  public summary = this.viewService.summary;

  // Helpers computed for layout
  public spentAmount = computed(() => this.summary()?.budget.spentAmount ?? 0);
  public totalAllocated = computed(
    () => this.summary()?.budget.totalAllocated ?? 0,
  );
  public remainingAmount = computed(
    () => this.summary()?.budget.remainingAmount ?? 0,
  );
  public burnPercentage = computed(
    () => this.summary()?.budget.monthlyBudgetBurnPercentage ?? 0,
  );
  public unbudgetedTotal = computed(
    () => this.summary()?.unbudgetedExpenses.totalAmount ?? 0,
  );
  public unbudgetedCount = computed(
    () => this.summary()?.unbudgetedExpenses.transactionCount ?? 0,
  );
  public plannedAmount = computed(() =>
    Math.max(0, this.spentAmount() - this.unbudgetedTotal()),
  );
  public topCategories = computed(
    () => this.summary()?.topCategoriesSpent ?? [],
  );

  public budgetStateData = computed<DonutChartData | null>(() => {
    const data = this.summary();
    if (!data) return null;

    return {
      labels: ['Gastado', 'Disponible'],
      series: [this.spentAmount(), Math.max(0, this.remainingAmount())],
      colors: ['#f43f5e', '#10b981'],
      centerLabel: 'Presupuesto',
      totalValue: this.totalAllocated(),
    };
  });

  public categoriesData = computed<PieChartData | null>(() => {
    const data = this.summary();
    if (!data || !data.topCategoriesSpent.length) return null;

    const sortedCategories = [...data.topCategoriesSpent].sort(
      (a, b) => b.totalAmount - a.totalAmount,
    );

    return {
      labels: sortedCategories.map((c) => c.categoryName),
      series: sortedCategories.map((c) => c.totalAmount),
      colors: ['#6366f1', '#a855f7', '#06b6d4', '#f59e0b', '#10b981'],
    };
  });

  public budgetLeakData = computed<DonutChartData | null>(() => {
    const data = this.summary();
    if (!data) return null;

    return {
      labels: ['Planificado', 'Imprevistos (Fugas)'],
      series: [this.plannedAmount(), this.unbudgetedTotal()],
      colors: ['#6366f1', '#f59e0b'],
      centerLabel: 'Gasto Total',
      totalValue: this.spentAmount(),
    };
  });
}
