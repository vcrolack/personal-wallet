import { Component, input, computed, inject } from '@angular/core';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { DonutChartComponent } from '../../../../../../common/components/charts/donut-chart/donut-chart.component';
import { DonutChartData } from '../../../../../../common/components/charts/models/donut-chart.model';
import { PieChartData } from '../../../../../../common/components/charts/models/pie-chart.model';
import { PieChartComponent } from '../../../../../../common/components/charts/pie-chart/pie-chart.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { CarouselComponent } from '../../../../../../common/components/ui/carousel/carousel.component';
import { CarouselSlideDirective } from '../../../../../../common/components/ui/carousel/carousel-slide.directive';
import { TitleComponent } from '../../../../../../common/components/ui/typography/title/title.component';
import { TextComponent } from '../../../../../../common/components/ui/typography/text/text.component';

@Component({
  selector: 'app-visual-resume',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    DonutChartComponent,
    PieChartComponent,
    WrapperComponent,
    CarouselComponent,
    CarouselSlideDirective,
    TitleComponent,
    TextComponent,
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
    const totalAllocated = categories.reduce(
      (acc, cat) => acc + cat.totalAllocated,
      0,
    );
    const unallocated = Math.max(0, budget.budgetAmount - totalAllocated);

    const series = [...categories.map((cat) => cat.totalAllocated)];
    const labels = [...categories.map((cat) => cat.categoryName)];

    if (unallocated > 0) {
      series.push(unallocated);
      labels.push('Sin asignar');
    }

    return {
      series: series,
      labels: labels,
      colors: [
        '#2563eb',
        '#91B2EB',
        '#f87171',
        '#fbbf24',
        '#10b981',
        '#6366f1',
        '#e2e8f0', // added light gray for unallocated
      ],
    };
  });

  public topCategoriesResume = computed(() => {
    const budget = this.budget();
    const categories = budget.groups;
    const sortedCategories = [...categories].sort(
      (a, b) => b.totalAllocated - a.totalAllocated,
    );
    return sortedCategories.slice(0, 3);
  });

  public purpuses = computed<PieChartData>(() => {
    const budget = this.budget();
    const groups = budget.groups;

    const rulesMap = groups.reduce(
      (acc, group) => {
        const rule = group.rule;
        acc[rule] = (acc[rule] || 0) + group.totalAllocated;
        return acc;
      },
      {} as Record<string, number>,
    );

    const series = Object.values(rulesMap);
    const labels = Object.keys(rulesMap);

    return {
      series: series,
      labels: labels,
      colors: [
        '#2563eb', // blue-600
        '#91B2EB', // blue-300
        '#10b981', // emerald-500
        '#fbbf24', // amber-400
        '#f87171', // red-400
      ],
    };
  });

  public get budgetAmount(): string {
    return this.currencyPipe.transform(
      this.budget().budgetAmount,
      'CLP',
      'symbol-narrow',
      '1.0-0',
    )!;
  }
}
