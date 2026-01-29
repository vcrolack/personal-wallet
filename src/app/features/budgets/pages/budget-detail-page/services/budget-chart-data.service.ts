import { computed, Injectable, signal } from '@angular/core';
import { BudgetModel } from '../../../../../core/models/budgets/budget.model';
import { DonutChartData } from '../../../../../common/components/charts/models/donut-chart.model';
import { PieChartData } from '../../../../../common/components/charts/models/pie-chart.model';
import {
  CHART_COLORS,
  CHART_SERIES_PALETTE,
} from '../../../../../common/components/charts/chart-colors.constants';

@Injectable()
export class BudgetChartDataService {
  private _budget = signal<BudgetModel | null>(null);

  public setBudget(budget: BudgetModel): void {
    this._budget.set(budget);
  }

  public budgetAmountResume = computed<DonutChartData | undefined>(() => {
    const budget = this._budget();
    if (!budget) return;

    const remaining = Math.max(0, budget.budgetAmount - budget.totalSpent);

    return {
      series: [budget.totalSpent, remaining],
      centerLabel: undefined,
      labels: ['Gastado', 'Restante'],
      colors: [CHART_COLORS.primary500, CHART_COLORS.primary200],
    };
  });

  public categoriesResume = computed<PieChartData | undefined>(() => {
    const budget = this._budget();
    if (!budget) return;

    const categories = budget.groups;
    const totalAllocated = categories.reduce(
      (acc, cat) => acc + cat.totalAllocated,
      0,
    );
    const unallocated = Math.max(0, budget.budgetAmount - totalAllocated);

    const series = categories.map((cat) => cat.totalAllocated);
    const labels = categories.map((cat) => cat.categoryName);

    if (unallocated > 0) {
      series.push(unallocated);
      labels.push('Sin asignar');
    }

    return {
      series,
      labels,
      colors: [...CHART_SERIES_PALETTE],
    };
  });

  public topCategories = computed(() => {
    const budget = this._budget();
    if (!budget) return [];

    return [...budget.groups]
      .sort((a, b) => b.totalAllocated - a.totalAllocated)
      .slice(0, 3);
  });

  public purposes = computed<PieChartData | undefined>(() => {
    const budget = this._budget();
    if (!budget) return;

    const rulesMap = budget.groups.reduce(
      (acc, group) => {
        acc[group.rule] = (acc[group.rule] || 0) + group.totalAllocated;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      series: Object.values(rulesMap),
      labels: Object.keys(rulesMap),
      colors: [
        CHART_COLORS.primary500,
        CHART_COLORS.primary300,
        CHART_COLORS.success,
        CHART_COLORS.warning,
        CHART_COLORS.danger,
      ],
    };
  });
}
