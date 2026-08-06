import { Component, computed, input } from '@angular/core';
import { ChartOptions } from '@common/components/charts/models/chart-options.model';
import { BarChartData } from '@common/components/charts/models/bar-chart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  public chartData = input.required<BarChartData>();
  public height = input<number>(300);

  public valueFormatter = input<(val: number) => string>(
    (val) => `$${val.toLocaleString('es-CL')}`,
  );

  public chartOptions = computed<Partial<ChartOptions>>(() => {
    const data = this.chartData();
    const formatter = this.valueFormatter();

    return {
      series: data.series,
      chart: {
        type: 'bar',
        height: this.height(),
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      colors: data.colors ?? ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            fontFamily: 'Inter, sans-serif',
            colors: '#64748b',
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => formatter(val),
          style: {
            fontFamily: 'Inter, sans-serif',
            colors: '#64748b',
          },
        },
      },
      grid: {
        borderColor: '#334155',
        strokeDashArray: 4,
        yaxis: {
          lines: { show: true },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => formatter(val),
        },
        theme: 'dark',
      },
      legend: {
        position: 'top',
        fontFamily: 'Inter, sans-serif',
        labels: {
          colors: '#64748b',
        },
      },
    };
  });
}
