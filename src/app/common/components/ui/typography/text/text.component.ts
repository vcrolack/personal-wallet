import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type TextVariant =
  | 'body'
  | 'small'
  | 'xs'
  | 'label'
  | 'value'
  | 'lg'
  | 'xl'
  | '2xl';
export type TextColor =
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'slate'
  | 'indigo'
  | 'danger'
  | 'success';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    @switch (tag()) {
      @case ('p') {
        <p [class]="classes">
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </p>
      }
      @default {
        <span [class]="classes">
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </span>
      }
    }
  `,
})
export class TextComponent {
  public tag = input<'span' | 'p'>('span');
  public variant = input<TextVariant>('body');
  public color = input<TextColor | null>('slate');
  public weight = input<'normal' | 'medium' | 'semibold' | 'bold' | 'black'>(
    'normal',
  );
  public uppercase = input<boolean>(false);
  public capitalize = input<boolean>(false);
  public className = input<string>('', { alias: 'class' });

  private variantClasses: Record<TextVariant, string> = {
    body: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
    xs: 'text-[10px] md:text-xs',
    label: 'text-[10px] uppercase tracking-widest leading-none',
    value: 'text-base md:text-lg tracking-tight font-black',
    lg: 'text-lg md:text-xl tracking-tight font-black',
    xl: 'text-xl md:text-2xl tracking-tight font-black',
    '2xl': 'text-2xl md:text-3xl tracking-tight font-black',
  };

  private colorClasses: Record<TextColor, string> = {
    primary: 'text-primary-500',
    secondary: 'text-content-muted',
    terciary: 'text-primary-500',
    slate: 'text-content-secondary',
    indigo: 'text-primary-500',
    danger: 'text-danger',
    success: 'text-success',
  };

  private weightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  };

  get classes(): string {
    const colorClass = this.color() ? this.colorClasses[this.color()!] : '';

    return [
      this.variantClasses[this.variant()],
      colorClass,
      this.weightClasses[this.weight()],
      this.uppercase() ? 'uppercase' : '',
      this.capitalize() ? 'capitalize' : '',
      this.tag() === 'span' ? 'inline-block' : 'block',
      'leading-normal',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  }
}
