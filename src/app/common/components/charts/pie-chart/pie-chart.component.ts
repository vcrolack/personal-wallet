import { Component, computed, input } from '@angular/core';
import { ChartOptions } from '../models/chart-options.model';
import { PieChartData } from '../models/pie-chart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  public chartData = input.required<PieChartData>();
  public height = input<number>(300);

  public valueFormatter = input<(val: number) => string>(
    (val) => `$${val.toLocaleString('es-CL')}`
  );

  public chartOptions = computed<Partial<ChartOptions>>(() => {
    const data = this.chartData();
    const formatter = this.valueFormatter();

    return {
      series: data.series,
      labels: data.labels,
      colors: data.colors ?? [
        '#2563eb',
        '#e2e8f0',
        '#f87171',
        '#fbbf24',
        '#10b981',
        '#6366f1',
      ],
      chart: {
        type: 'pie',
        size: '70%',
        height: 300,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        labels: {
          colors: '#64748b',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
        },
        dropShadow: {
          enabled: false,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['#fff'],
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: formatter,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  });
}
