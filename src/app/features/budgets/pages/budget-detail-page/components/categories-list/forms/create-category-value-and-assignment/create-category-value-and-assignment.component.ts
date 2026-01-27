import { Component, inject, input, output } from '@angular/core';
import { InputComponent } from '../../../../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../../../../common/components/form/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetCategoryValuesService } from '../../../../../../../../core/services/budget-category-values.service';
import { BudgetCategoryAssignmentsService } from '../../../../../../../../core/services/budget-category-assignments.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BudgetService } from '../../../../../../../../core/services/budget.service';

@Component({
  selector: 'app-create-category-value-and-assignment',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-category-value-and-assignment.component.html',
  styleUrl: './create-category-value-and-assignment.component.css',
})
export class CreateCategoryValueAndAssignmentComponent {
  private fb = inject(FormBuilder);
  private budgetService = inject(BudgetService);
  private categoryValueService = inject(BudgetCategoryValuesService);
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);

  public categoryId = input.required<number>();
  public budget = this.budgetService.budgetResourceDetail;

  public closeModal = output<void>();

  public form = this.fb.group({
    categoryValueName: ['', [Validators.required]],
    allocatedAmount: ['', [Validators.required, Validators.min(1)]],
  });

  public createCategoryValueAndAssignment() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.budget.hasValue()) return;

    return this.categoryValueService
      .create({
        name: this.form.value.categoryValueName!,
        budgetCategoryId: this.categoryId(),
      })
      .pipe(
        switchMap((categoryValue) =>
          this.categoryAssignmentService.assignCategory({
            budgetId: this.budget.value()!.id,
            budgetCategoryValueId: categoryValue.id,
            allocatedAmount: +this.form.value.allocatedAmount!,
          }),
        ),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.error?.message));
        }),
      )
      .subscribe({
        next: () => {
          this.budget.reload();
          this.closeModal.emit();
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
