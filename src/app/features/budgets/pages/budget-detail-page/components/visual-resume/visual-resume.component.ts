import { Component, input, computed, inject } from '@angular/core';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { DonutChartComponent } from '../../../../../../common/components/charts/donut-chart/donut-chart.component';
import { DonutChartData } from '../../../../../../common/components/charts/models/donut-chart.model';
import { PieChartData } from '../../../../../../common/components/charts/models/pie-chart.model';
import { PieChartComponent } from '../../../../../../common/components/charts/pie-chart/pie-chart.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';

@Component({
  selector: 'app-visual-resume',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    DonutChartComponent,
    PieChartComponent,
    WrapperComponent,
  ],
  templateUrl: './visual-resume.component.html',
  styleUrl: './visual-resume.component.css',
  providers: [CurrencyPipe],
})
export class VisualResumeComponent {
  public budget = input.required<BudgetModel>();

  public currencyPipe = inject(CurrencyPipe);

  public budgetAmountResume = computed<DonutChartData>(() => {
    const budget = this.budget();
    const remaining = Math.max(0, budget.budgetAmount - budget.totalSpent);

    return {
      series: [budget.totalSpent, remaining],
      centerLabel: this.budgetAmount,
      labels: ['Gastado', 'Restante'],
      colors: ['#2563eb', '#91B2EB'], // blue-600 and gray-200
    };
  });

  public categoriesResume = computed<PieChartData>(() => {
    const budget = this.budget();
    const categories = budget.groups;
    const totalSpentByCategory = categories.map((cat) => cat.totalAllocated);

    return {
      series: totalSpentByCategory,
      centerLabel: this.budgetAmount,
      labels: categories.map((cat) => cat.categoryName),
      colors: [
        '#2563eb',
        '#91B2EB',
        '#f87171',
        '#fbbf24',
        '#10b981',
        '#6366f1',
      ],
    };
  });

  public topCategoriesResume = computed(() => {
    const budget = this.budget();
    const categories = budget.groups;
    const sortedCategories = categories.sort(
      (a, b) => b.totalAllocated - a.totalAllocated
    );
    return sortedCategories.slice(0, 3);
  });

  public get budgetAmount(): string {
    return this.currencyPipe.transform(
      this.budget().budgetAmount,
      'CLP',
      'symbol-narrow',
      '1.0-0'
    )!;
  }
}
