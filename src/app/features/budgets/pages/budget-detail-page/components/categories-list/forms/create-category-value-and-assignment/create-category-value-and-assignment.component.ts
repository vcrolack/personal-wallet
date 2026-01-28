import { Component, inject, input, output } from '@angular/core';
import { InputComponent } from '../../../../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../../../../common/components/form/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetCategoryValuesService } from '../../../../../../../../core/services/budget-category-values.service';
import { BudgetCategoryAssignmentsService } from '../../../../../../../../core/services/budget-category-assignments.service';
import { switchMap } from 'rxjs';
import { BudgetService } from '../../../../../../../../core/services/budget.service';
import { ToastService } from '../../../../../../../../common/components/ui/toast/toast.service';

@Component({
  selector: 'app-create-category-value-and-assignment',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-category-value-and-assignment.component.html',
  styleUrl: './create-category-value-and-assignment.component.css',
})
export class CreateCategoryValueAndAssignmentComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
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
      )
      .subscribe({
        next: () => {
          this.toastService.show('Categoría agregada correctamente', 'success');
          this.budget.reload();
          this.closeModal.emit();
          this.form.reset();
        },
      });
  }
}
