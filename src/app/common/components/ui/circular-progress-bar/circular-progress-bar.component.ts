import {
  Component,
  computed,
  input,
  signal,
  afterNextRender,
} from '@angular/core';
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

  private showProgress = signal(false);
  public animatedPercentage = signal(0);

  constructor() {
    afterNextRender(() => {
      // Un pequeño retraso asegura que el navegador renderice el estado inicial (0%)
      // proporcionando un punto de partida para la transición CSS.
      setTimeout(() => {
        this.showProgress.set(true);
        this.animateValue(0, this.percentage(), 1000);
      }, 50);
    });
  }

  private animateValue(start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      this.animatedPercentage.set(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  public percentage = computed(() => {
    if (this.totalValue() === 0) return 0;
    return Math.min(
      100,
      Math.round((this.currentValue() / this.totalValue()) * 100)
    );
  });

  public dynamicColor = computed(() => {
    const p = this.animatedPercentage();
    // Interpolamos el Hue de Green (140) a Red (0)
    // 0% -> 140 (Green)
    // 50% -> 70 (Yellow)
    // 100% -> 0 (Red)
    const hue = Math.max(0, 140 - p * 1.4);
    return `hsl(${hue}, 80%, 45%)`;
  });

  public radius = computed(() => this.size() / 2 - this.strokeWidth() / 2);
  public circumference = computed(() => 2 * Math.PI * this.radius());

  public dashOffset = computed(() => {
    const p = this.showProgress() ? this.percentage() : 0;
    return this.circumference() - (p / 100) * this.circumference();
  });

  public center = computed(() => this.size() / 2);
}
