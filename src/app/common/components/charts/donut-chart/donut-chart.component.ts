import { Component, computed, input } from '@angular/core';
import { ChartOptions } from '../models/chart-options.model';
import { DonutChartData } from '../models/donut-chart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent {
  public chartData = input.required<DonutChartData>();
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
      colors: data.colors ?? ['#2563eb', '#e2e8f0', '#f87171', '#fbbf24'],
      chart: {
        type: 'donut',
        height: this.height(),
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            // size: '70%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: '#64748b',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#1e293b',
                offsetY: 10,
                formatter: formatter,
              },
              total: {
                show: !!data.centerLabel,
                label: data.centerLabel ?? '',
                fontSize: '20px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                formatter: () =>
                  data.totalValue ? formatter(data.totalValue) : '',
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        labels: {
          colors: '#64748b',
        },
      },
      stroke: {
        show: false,
      },
      fill: {
        type: 'solid',
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: formatter,
        },
      },
    };
  });
}
