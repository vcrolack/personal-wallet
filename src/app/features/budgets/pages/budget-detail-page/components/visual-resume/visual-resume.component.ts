import { Component, input, computed, inject } from '@angular/core';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { DonutChartComponent } from '../../../../../../common/components/charts/donut-chart/donut-chart.component';
import { DonutChartData } from '../../../../../../common/components/charts/models/donut-chart.model';



@Component({
  selector: 'app-visual-resume',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, DonutChartComponent],
  templateUrl: './visual-resume.component.html',
  styleUrl: './visual-resume.component.css',
  providers: [CurrencyPipe]
})
export class VisualResumeComponent {
  public budget = input.required<BudgetModel>();

  public currencyPipe = inject(CurrencyPipe);

  public chartData = computed<DonutChartData>(() => {
    const budget = this.budget();
    const remaining = Math.max(0, budget.budgetAmount - budget.totalSpent);
    
    return {
      series: [budget.totalSpent, remaining],
      centerLabel: this.budgetAmount,
      labels: ['Gastado', 'Restante'],
      colors: ['#2563eb', '#91B2EB'], // blue-600 and gray-200
    };
  });

  public get budgetAmount(): string {
    return this.currencyPipe.transform(this.budget().budgetAmount, 'CLP', 'symbol-narrow', '1.0-0')!;
  }
}
