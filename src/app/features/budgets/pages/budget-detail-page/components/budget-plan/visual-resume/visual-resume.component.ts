import { CurrencyPipe, CommonModule } from '@angular/common';
import { inject, input, effect, computed, Component } from '@angular/core';
import { DonutChartComponent } from '../../../../../../../common/components/charts/donut-chart/donut-chart.component';
import { DonutChartData } from '../../../../../../../common/components/charts/models/donut-chart.model';
import { PieChartComponent } from '../../../../../../../common/components/charts/pie-chart/pie-chart.component';
import { CarouselSlideDirective } from '../../../../../../../common/components/ui/carousel/carousel-slide.directive';
import { CarouselComponent } from '../../../../../../../common/components/ui/carousel/carousel.component';
import { TextComponent } from '../../../../../../../common/components/ui/typography/text/text.component';
import { TitleComponent } from '../../../../../../../common/components/ui/typography/title/title.component';
import { WrapperComponent } from '../../../../../../../common/components/ui/wrapper/wrapper.component';
import { BudgetModel } from '../../../../../../../core/models/budgets/budget.model';
import { BudgetChartDataService } from '../../../services/budget-chart-data.service';

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
