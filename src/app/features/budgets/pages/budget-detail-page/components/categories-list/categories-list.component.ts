import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../../../common/components/ui/modal/modal.component';
import { CreateCategoryValueAndAssignmentComponent } from './forms/create-category-value-and-assignment/create-category-value-and-assignment.component';
import { BudgetService } from '../../../../../../core/services/budget.service';
import { IconButtonComponent } from '../../../../../../common/components/form/icon-button/icon-button.component';
import { BudgetCategoryAssignmentsService } from '../../../../../../core/services/budget-category-assignments.service';
import { EmptyStateComponent } from '../../../../../../common/components/ui/empty-state/empty-state.component';
import { EditableFieldComponent } from '../../../../../../common/components/ui/editable-field/editable-field.component';
import { CircleDollarSign } from 'lucide-angular';
import { UpdateBudgetCategoryAssignmentRequest } from '../../../../../../core/requests/budget-category-assignments/update-budget-category-assignment.request';

@Component({
  selector: 'app-categories-list',
  imports: [
    CurrencyPipe,
    WrapperComponent,
    ButtonComponent,
    ModalComponent,
    CreateCategoryValueAndAssignmentComponent,
    IconButtonComponent,
    EmptyStateComponent,
    EditableFieldComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  private budgetService = inject(BudgetService);
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);

  public emptyStateIcon = CircleDollarSign;

  public isModalOpen = signal<boolean>(false);
  public selectedCategoryId = signal<number | null>(null);

  public budget = this.budgetService.budgetResourceDetail;

  public groupedCategories = computed(() => this.budget.value()?.groups ?? []);

  public toggleModal(categoryId?: number) {
    this.selectedCategoryId.set(categoryId ?? null);
    this.isModalOpen.update((prev) => !prev);
  }

  public unassignCategoryValue(id: string) {
    this.categoryAssignmentService.unassignCategory(id).subscribe({
      next: () => {
        this.budget.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public editAssignmentCategoryValue(
    id: string,
    body: UpdateBudgetCategoryAssignmentRequest,
  ) {
    this.categoryAssignmentService.updateAssignment(id, body).subscribe({
      next: () => {
        this.budget.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
