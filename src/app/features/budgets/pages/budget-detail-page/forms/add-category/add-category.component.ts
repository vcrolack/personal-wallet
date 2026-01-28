import { Component, inject, output, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetCategoryAssignmentsService } from '../../../../../../core/services/budget-category-assignments.service';
import { CreateBudgetCategoryAssignmentRequest } from '../../../../../../core/requests/budget-category-assignments/create-budget-category-assignment.request';
import { BudgetService } from '../../../../../../core/services/budget.service';
import { finalize } from 'rxjs';

import { CategorySelector } from './category-selector/category-selector';
import { AmountInput } from './amount-input/amount-input';
import { ToastService } from '../../../../../../common/components/ui/toast/toast.service';
import { CategoryValueSelector } from './category-value-selector/category-value-selector';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    CategorySelector,
    CategoryValueSelector,
    AmountInput,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnDestroy {
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);
  private budgetService = inject(BudgetService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  public closeModal = output<void>();

  public isLoadingCreatingAssignment = signal<boolean>(false);

  public budgetDetailResource = this.budgetService.budgetResourceDetail;

  public form: FormGroup = this.fb.group({
    category: [null, Validators.required],
    categoryValue: [null, Validators.required],
    amount: [null, Validators.required],
  });

  public categoryValueId = toSignal(
    this.form.get('categoryValue')!.valueChanges,
    {
      initialValue: null,
    },
  );

  ngOnDestroy(): void {
    this.form.reset();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.budgetDetailResource.hasValue()) return;

    const body: CreateBudgetCategoryAssignmentRequest = {
      budgetId: this.budgetDetailResource.value()!.id,
      budgetCategoryValueId: this.categoryValueId(),
      allocatedAmount: this.form.value.amount!,
    };

    this.createCategoryAssignment(body);
  }

  public createCategoryAssignment(body: CreateBudgetCategoryAssignmentRequest) {
    this.isLoadingCreatingAssignment.set(true);
    this.categoryAssignmentService
      .assignCategory({
        budgetId: body.budgetId,
        budgetCategoryValueId: body.budgetCategoryValueId,
        allocatedAmount: +body.allocatedAmount,
      })
      .pipe(finalize(() => this.isLoadingCreatingAssignment.set(false)))
      .subscribe({
        next: () => {
          this.form.reset();
          this.budgetDetailResource.reload();
          this.closeModal.emit();
          this.toastService.show('Categoría agregada correctamente', 'success');
        },
      });
  }
}
