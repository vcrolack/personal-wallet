import { Component, computed, input, output } from '@angular/core';

import { LucideAngularModule, Trash2, Pencil, Plus } from 'lucide-angular';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'ghost';
export type IconButtonSize = 'small' | 'medium' | 'large';

export const ICONS = {
  'trash-2': Trash2,
  pencil: Pencil,
  plus: Plus,
} as const;

export const COLORS = {
  primary: '#155dfc',
  secondary: '#6b7280',
  success: '#22c55d',
  danger: '#ef4444',
  ghost: '#9ca3af',
} as const;

export type IconName = keyof typeof ICONS;

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css',
})
export class IconButtonComponent {
  public name = input.required<IconName>();
  public variant = input<IconButtonVariant>('ghost');
  public size = input<IconButtonSize>('medium');
  public disabled = input(false);
  public color = input<IconButtonVariant>('primary');
  public onClick = output<void>();

  public icons = ICONS;
  public colors = COLORS;

  public buttonClasses = computed(() => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses: Record<IconButtonVariant, string> = {
      primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      secondary: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
      success: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
      danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-slate-500 hover:bg-slate-100 focus:ring-slate-400',
    };

    const sizeClasses: Record<IconButtonSize, string> = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-10 h-10 text-base',
      large: 'w-12 h-12 text-lg',
    };

    const disabledClasses = this.disabled()
      ? 'opacity-40 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer active:scale-95';

    return `${baseClasses} ${variantClasses[this.variant()]} ${
      sizeClasses[this.size()]
    } ${disabledClasses}`;
  });

  public handleClick(event: Event) {
    event.stopPropagation();
    if (this.disabled()) return;
    this.onClick.emit();
  }
}
