import { DatePipe } from '@angular/common';
import { MoneyPipe } from '@common/pipes/money.pipe';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { AmountCounterComponent } from '@features/dashboard/components/amount-counter/amount-counter.component';
import { DashboardService, BudgetService } from '@core/services';
import { BarChartComponent, BarChartData, DonutChartComponent, DonutChartData, CHART_COLORS, CHART_SERIES_PALETTE } from '@common/components/charts';
import { ProgressBarComponent } from '@common/components/ui';

@Component({
  selector: 'app-dashboard.page',
  standalone: true,
  imports: [
    AmountCounterComponent, 
    DatePipe, 
    MoneyPipe, 
    BarChartComponent, 
    DonutChartComponent, 
    ProgressBarComponent
  ],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.css',
})
export class DashboardPageComponent {
  private dashboardService = inject(DashboardService);
  private budgetService = inject(BudgetService);

  public currentDate: Date = new Date();
  
  public budgetsResource = this.budgetService.budgetResourceList;
  public dashboardResource = this.dashboardService.dashboardResource;
  
  public selectedBudgetId = signal<string>('');

  constructor() {
    effect(() => {
      const budgetsData = this.budgetsResource.value();
      if (budgetsData?.data && budgetsData.data.length > 0) {
        if (!this.selectedBudgetId()) {
          const defaultBudget = budgetsData.data[0];
          this.onBudgetChange(defaultBudget.id);
        }
      }
    });
  }

  public onBudgetChange(budgetId: string) {
    this.selectedBudgetId.set(budgetId);
    
    const budget = this.budgetsResource.value()?.data?.find(b => b.id === budgetId);
    
    let startDate: string | undefined = undefined;
    let endDate: string | undefined = undefined;
    
    if (budget) {
        startDate = budget.startDate ? new Date(budget.startDate).toISOString().split('T')[0] : undefined;
        endDate = budget.endDate ? new Date(budget.endDate).toISOString().split('T')[0] : undefined;
    }

    this.dashboardService.selectBudgetAndDates(budgetId, startDate, endDate);
  }

  public onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.onBudgetChange(target.value);
  }

  public bankDonutData = computed<DonutChartData | undefined>(() => {
    const data = this.dashboardResource.value()?.bankDistribution;
    if (!data || data.length === 0) return undefined;
    
    return {
      series: data.map((b: any) => b.totalSpent),
      labels: data.map((b: any) => b.bankName),
      colors: [...CHART_SERIES_PALETTE],
      centerLabel: 'Total',
      totalValue: data.reduce((acc: number, b: any) => acc + b.totalSpent, 0),
    };
  });

  public monthlyTrendsBarData = computed<BarChartData | undefined>(() => {
    const data = this.dashboardResource.value()?.monthlyTrends;
    if (!data || data.length === 0) return undefined;
    
    return {
      series: [{
        name: 'Gastos',
        data: data.map((t: any) => t.totalSpent)
      }],
      categories: data.map((t: any) => t.month),
      colors: [CHART_COLORS.primary500]
    };
  });
}
