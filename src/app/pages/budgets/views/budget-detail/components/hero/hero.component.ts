import { Component, input } from '@angular/core';
import { Budget } from '../../../../../../core/interfaces/budget.interface';
import {
  BadgeComponent,
  BadgeVariant,
} from '../../../../../../common/components/badge/badge.component';
import { WrapperComponent } from '../../../../../../common/components/wrapper/wrapper.component';
import { ProgressBarComponent } from '../../../../../../common/components/progress-bar/progress-bar.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [
    WrapperComponent,
    ProgressBarComponent,
    BadgeComponent,
    CurrencyPipe,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  public budget = input.required<Budget>();

  public get isShared(): { label: string; variant: BadgeVariant } {
    if (!this.budget()?.isShared)
      return {
        label: 'Público',
        variant: 'success',
      };

    return {
      label: 'Privado',
      variant: 'danger',
    };
  }

  public get period(): string {
    return `desde ${this.budget()?.startDate} hasta ${this.budget()?.endDate}`;
  }
}
