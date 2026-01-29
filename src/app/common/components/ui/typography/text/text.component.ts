import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export type TextVariant = 'body' | 'small' | 'xs' | 'label' | 'value';
export type TextColor =
  | 'primary'
  | 'secondary'
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
  public color = input<TextColor>('slate');
  public weight = input<'normal' | 'medium' | 'semibold' | 'bold' | 'black'>(
    'normal',
  );
  public uppercase = input<boolean>(false);

  private variantClasses: Record<TextVariant, string> = {
    body: 'text-sm md:text-base',
    small: 'text-xs md:text-sm',
    xs: 'text-[10px] md:text-xs',
    label: 'text-[10px] uppercase tracking-widest leading-none',
    value: 'text-base md:text-lg tracking-tight font-black',
  };

  private colorClasses: Record<TextColor, string> = {
    primary: 'text-indigo-600',
    secondary: 'text-slate-400',
    slate: 'text-slate-500',
    indigo: 'text-indigo-600',
    danger: 'text-red-500',
    success: 'text-emerald-500',
  };

  private weightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  };

  get classes(): string {
    return [
      this.variantClasses[this.variant()],
      this.colorClasses[this.color()],
      this.weightClasses[this.weight()],
      this.uppercase() ? 'uppercase' : '',
      this.tag() === 'span' ? 'inline-block' : 'block',
      'leading-normal',
    ].join(' ');
  }
}
