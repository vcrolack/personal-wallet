import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="'animate-pulse bg-gray-200 ' + className()"
      [style.width]="width()"
      [style.height]="height()"
      [style.border-radius]="borderRadius()"
    ></div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        width: 100%;
      }
    `,
  ],
})
export class SkeletonComponent {
  public width = input<string>('100%');
  public height = input<string>('20px');
  public borderRadius = input<string>('0.375rem');
  public className = input<string>('');
}
