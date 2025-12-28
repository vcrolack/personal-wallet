import { Component, computed, input, output } from '@angular/core';

export enum Variants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
}

export enum Sizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  public label = input.required<string>();
  public variant = input(Variants.PRIMARY);
  public size = input(Sizes.MEDIUM);

  public onClick = output<void>();

  public buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      [Variants.PRIMARY]:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      [Variants.SECONDARY]:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      [Variants.SUCCESS]:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      [Variants.DANGER]:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeClasses = {
      [Sizes.SMALL]: 'px-3 py-1.5 text-sm',
      [Sizes.MEDIUM]: 'px-4 py-2 text-base',
      [Sizes.LARGE]: 'px-6 py-3 text-lg',
    };

    return `${baseClasses} ${variantClasses[this.variant()]} ${
      sizeClasses[this.size()]
    }`;
  });

  public handleClick() {
    this.onClick.emit();
  }
}
