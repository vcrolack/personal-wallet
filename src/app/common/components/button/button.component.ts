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

  public onClick = output<void>();

  public buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };

    const disabledClasses = this.disabled()
      ? 'opacity-50 cursor-not-allowed pointer-events-none'
      : '';

    return `${baseClasses} ${variantClasses[this.variant()]} ${
      sizeClasses[this.size()]
    } ${disabledClasses}`;
  });

  public handleClick() {
    if (this.disabled()) return;
    this.onClick.emit();
  }
}
