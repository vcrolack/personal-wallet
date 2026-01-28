import { computed, inject, Injectable, signal } from '@angular/core';
import { BudgetService } from '../../../../../core/services/budget.service';
import { BudgetCategoryAssignmentsService } from '../../../../../core/services/budget-category-assignments.service';
import { CircleDollarSign } from 'lucide-angular';
import { UpdateBudgetCategoryAssignmentRequest } from '../../../../../core/requests/budget-category-assignments/update-budget-category-assignment.request';

@Injectable()
export class BudgetViewService {
  private budgetService = inject(BudgetService);
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);

  public emptyStateIcon = CircleDollarSign;

  public isModalOpen = signal<boolean>(false);
  public selectedCategoryId = signal<number | null>(null);

  public budget = this.budgetService.budgetResourceDetail;

  public groupedCategories = computed(() => this.budget.value()?.groups ?? []);

  public toggleModal(categoryId?: number) {
    console.log(categoryId);
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
