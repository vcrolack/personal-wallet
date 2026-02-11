import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';

export type ButtonTextVariant = 'primary' | 'secondary' | 'danger';
export type ButtonTextSize = 'small' | 'medium' | 'large';

export const ICONS = {
  plus: Plus,
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-button-text',
  imports: [LucideAngularModule],
  templateUrl: './button-text.component.html',
  styleUrl: './button-text.component.css',
})
export class ButtonTextComponent {
  public label = input.required<string>();
  public variant = input<ButtonTextVariant>('primary');
  public size = input<ButtonTextSize>('medium');
  public disabled = input(false);
  public loading = input(false);
  public icon = input<IconName>();

  public onClick = output<void>();

  public icons = ICONS;

  public buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent gap-2';

    const variantClasses: Record<ButtonTextVariant, string> = {
      primary:
        'text-primary-500 hover:text-primary-500/80 hover:underline focus:ring-primary-500',
      secondary:
        'text-content-primary hover:text-content-primary/80 hover:underline focus:ring-primary-500',
      danger:
        'text-danger hover:text-danger/80 hover:underline focus:ring-danger',
    };

    const sizeClasses: Record<ButtonTextSize, string> = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };

    const disabledClasses =
      this.disabled() || this.loading()
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : 'cursor-pointer';

    return `${baseClasses} ${variantClasses[this.variant()]} ${
      sizeClasses[this.size()]
    } ${disabledClasses}`;
  });

  public handleClick() {
    if (this.disabled() || this.loading()) return;
    this.onClick.emit();
  }
}
