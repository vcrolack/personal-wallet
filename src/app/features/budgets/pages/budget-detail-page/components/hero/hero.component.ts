import { Component, inject, input } from '@angular/core';
import { Budget } from '../../../../../../core/interfaces/budget.interface';
import {
  BadgeComponent,
  BadgeVariant,
} from '../../../../../../common/components/ui/badge/badge.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { ProgressBarComponent } from '../../../../../../common/components/ui/progress-bar/progress-bar.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';

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
  providers: [DatePipe],
})
export class HeroComponent {
  private datePipe = inject(DatePipe);
  public budget = input.required<BudgetModel>();

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
    return `desde ${this.datePipe.transform(
      this.budget().startDate,
      'dd/MM/yyyy'
    )} hasta ${this.datePipe.transform(this.budget().endDate, 'dd/MM/yyyy')}`;
  }
}
