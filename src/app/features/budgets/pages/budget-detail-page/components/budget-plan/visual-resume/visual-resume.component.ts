import { CurrencyPipe, CommonModule } from '@angular/common';
import { inject, input, effect, computed, Component } from '@angular/core';

import {
  DonutChartComponent,
  DonutChartData,
  PieChartComponent,
} from '@common/components/charts';
import {
  CarouselSlideDirective,
  CarouselComponent,
  TextComponent,
  TitleComponent,
  WrapperComponent,
} from '@common/components/ui';
import { BudgetModel } from '@core/models';
import { BudgetChartDataService } from '@features/budgets/pages/budget-detail-page/services/budget-chart-data.service';

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
  providers: [CurrencyPipe, BudgetChartDataService],
  templateUrl: './visual-resume.component.html',
  styleUrl: './visual-resume.component.css',
})
export class VisualResumeComponent {
  private chartService = inject(BudgetChartDataService);
  private currencyPipe = inject(CurrencyPipe);

  public budget = input.required<BudgetModel>();

  public categoriesResume = this.chartService.categoriesResume;
  public topCategoriesResume = this.chartService.topCategories;
  public purposes = this.chartService.purposes;

  constructor() {
    effect(() => {
      this.chartService.setBudget(this.budget());
    });
  }

  public budgetAmountResume = computed<DonutChartData | undefined>(() => {
    const data = this.chartService.budgetAmountResume();
    if (!data) return;

    return {
      ...data,
      centerLabel: this.currencyPipe.transform(
        this.budget().budgetAmount,
        'CLP',
        'symbol-narrow',
        '1.0-0',
      )!,
    };
  });
}
