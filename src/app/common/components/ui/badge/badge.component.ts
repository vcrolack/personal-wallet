import { Component, computed, input } from '@angular/core';
import { TextComponent } from '../typography/text/text.component';

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
  imports: [TextComponent],
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
      primary: 'bg-primary-500/15 text-primary-400 hover:bg-primary-500/25',
      success: 'bg-success/15 text-success hover:bg-success/25',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      danger: 'bg-danger/15 text-danger hover:bg-danger/25',
      info: 'bg-primary-500/15 text-primary-400 hover:bg-primary-500/25',
      neutral:
        'bg-surface-subtle text-content-primary hover:bg-surface-subtle/80',
    };

    return `${baseClasses} ${variantClasses[this.variant()]}`;
  });
}
