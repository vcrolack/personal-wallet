import { Component, inject, input, signal } from '@angular/core';
import {
  BadgeComponent,
  BadgeVariant,
} from '../../../../../../common/components/ui/badge/badge.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { CircularProgressBarComponent } from '../../../../../../common/components/ui/circular-progress-bar/circular-progress-bar.component';
import { BudgetService } from '../../../../../../core/services/budget.service';
import { finalize } from 'rxjs';
import { EditableFieldComponent } from '../../../../../../common/components/ui/editable-field/editable-field.component';

@Component({
  selector: 'app-hero',
  imports: [
    WrapperComponent,
    BadgeComponent,
    CurrencyPipe,
    CommonModule,
    CircularProgressBarComponent,
    EditableFieldComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [DatePipe],
})
export class HeroComponent {
  private budgetService = inject(BudgetService);
  private datePipe = inject(DatePipe);
  public budget = input.required<BudgetModel>();
  public isLoading = signal(false);

  public get difference(): number {
    return this.budget().budgetAmount - this.budget().totalSpent;
  }

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

  public onAmountUpdate(newAmount: number) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.budgetService
      .update(this.budget().id, { budgetAmount: +newAmount })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.budgetService.reloadDetail();
        },
        error: (err) => {
          console.error('Error updating budget:', err);
        },
      });
  }

  public onTitleUpdate(newTitle: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.budgetService
      .update(this.budget().id, { title: newTitle })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.budgetService.reloadDetail();
        },
        error: (err) => {
          console.error('Error updating budget:', err);
        },
      });
  }

  public onDescriptionUpdate(newDescription: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.budgetService
      .update(this.budget().id, { description: newDescription })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.budgetService.reloadDetail();
        },
        error: (err) => {
          console.error('Error updating budget:', err);
        },
      });
  }
}
