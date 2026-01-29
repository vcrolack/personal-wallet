import { Component, input } from '@angular/core';

export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type TitleColor = 'primary' | 'secondary' | 'slate' | 'indigo';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    @switch (level()) {
      @case ('h1') {
        <h1 [class]="classes"><ng-content></ng-content></h1>
      }
      @case ('h2') {
        <h2 [class]="classes"><ng-content></ng-content></h2>
      }
      @case ('h3') {
        <h3 [class]="classes"><ng-content></ng-content></h3>
      }
      @case ('h4') {
        <h4 [class]="classes"><ng-content></ng-content></h4>
      }
    }
  `,
})
export class TitleComponent {
  public level = input<TitleLevel>('h2');
  public color = input<TitleColor>('slate');
  public weight = input<
    'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
  >('bold');
  public uppercase = input<boolean>(false);

  private colorClasses: Record<TitleColor, string> = {
    primary: 'text-indigo-600',
    secondary: 'text-slate-500',
    slate: 'text-slate-900',
    indigo: 'text-indigo-900',
  };

  private levelClasses: Record<TitleLevel, string> = {
    h1: 'text-3xl md:text-4xl tracking-tight',
    h2: 'text-xl md:text-2xl tracking-normal',
    h3: 'text-base md:text-lg tracking-wide',
    h4: 'text-sm md:text-base tracking-wider',
  };

  private weightClasses: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  get classes(): string {
    return [
      this.levelClasses[this.level()],
      this.colorClasses[this.color()],
      this.weightClasses[this.weight()],
      this.uppercase() ? 'uppercase' : '',
      'transition-all duration-200',
    ].join(' ');
  }
}
