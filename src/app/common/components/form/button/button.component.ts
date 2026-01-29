import { Component, computed, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  public label = input.required<string>();
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('medium');
  public disabled = input(false);
  public loading = input(false);

  public onClick = output<void>();

  public buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
      secondary:
        'bg-surface-subtle text-content-primary hover:bg-surface-subtle/80 focus:ring-primary-500',
      success: 'bg-success text-white hover:bg-success/80 focus:ring-success',
      danger: 'bg-danger text-white hover:bg-danger/80 focus:ring-danger',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    const disabledClasses =
      this.disabled() || this.loading()
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : '';

    return `${baseClasses} ${variantClasses[this.variant()]} ${
      sizeClasses[this.size()]
    } ${disabledClasses}`;
  });

  public handleClick() {
    if (this.disabled() || this.loading()) return;
    this.onClick.emit();
  }
}
