import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  public label = input<string>('');
  public variant = input<BadgeVariant>('neutral');

  public badgeClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200';

    const variantClasses: Record<BadgeVariant, string> = {
      primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      danger: 'bg-red-100 text-red-800 hover:bg-red-200',
      info: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    };

    return `${baseClasses} ${variantClasses[this.variant()]}`;
  });
}
