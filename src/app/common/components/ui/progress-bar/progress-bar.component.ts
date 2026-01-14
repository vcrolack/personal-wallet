import { Component, computed, input } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  public currentValue = input.required<number>();
  public totalValue = input.required<number>();
  public color = input<string>('bg-blue-600');
  public showLabel = input<boolean>(true);

  public percentage = computed(() => {
    if (this.totalValue() === 0) return 0;
    const calc = (this.currentValue() / this.totalValue()) * 100;
    return Math.min(Math.max(calc, 0), 100);
  });

  public percentageLabel = computed(() => `${Math.round(this.percentage())}%`);
}
