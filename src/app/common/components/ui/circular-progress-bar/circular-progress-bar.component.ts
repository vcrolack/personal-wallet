import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circular-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-progress-bar.component.html',
  styleUrl: './circular-progress-bar.component.css',
})
export class CircularProgressBarComponent {
  public currentValue = input.required<number>();
  public totalValue = input.required<number>();
  public size = input<number>(100);
  public strokeWidth = input<number>(8);
  public color = input<string>('text-blue-600');

  public percentage = computed(() => {
    if (this.totalValue() === 0) return 0;
    return Math.min(
      100,
      Math.round((this.currentValue() / this.totalValue()) * 100)
    );
  });

  public radius = computed(() => this.size() / 2 - this.strokeWidth() / 2);
  public circumference = computed(() => 2 * Math.PI * this.radius());

  public dashOffset = computed(() => {
    const p = this.percentage();
    return this.circumference() - (p / 100) * this.circumference();
  });

  public center = computed(() => this.size() / 2);
}
