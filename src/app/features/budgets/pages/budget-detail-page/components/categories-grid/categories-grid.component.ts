import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../../../common/components/ui/modal/modal.component';
import { IconButtonComponent } from '../../../../../../common/components/form/icon-button/icon-button.component';
import { EmptyStateComponent } from '../../../../../../common/components/ui/empty-state/empty-state.component';
import { EditableFieldComponent } from '../../../../../../common/components/ui/editable-field/editable-field.component';
import { CircleDollarSign } from 'lucide-angular';
import { UpdateBudgetCategoryAssignmentRequest } from '../../../../../../core/requests/budget-category-assignments/update-budget-category-assignment.request';
import { BudgetViewService } from '../../services/budgetView.service';
import { CreateCategoryValueAndAssignmentComponent } from '../../forms/create-category-value-and-assignment/create-category-value-and-assignment.component';

@Component({
  selector: 'app-categories-grid',
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
  templateUrl: './categories-grid.component.html',
})
export class CategoriesGridComponent {
  private budgetViewService = inject(BudgetViewService);

  public isModalOpen = computed(() => this.budgetViewService.isModalOpen());

  public budget = this.budgetViewService.budget;
  public selectedCategoryId = computed(() =>
    this.budgetViewService.selectedCategoryId(),
  );
  public emptyStateIcon = CircleDollarSign;

  public groupedCategories = computed(() =>
    this.budgetViewService.groupedCategories(),
  );

  public toggleModal(categoryId?: number) {
    this.budgetViewService.toggleModal(categoryId);
  }

  public unassignCategoryValue(id: string) {
    this.budgetViewService.unassignCategoryValue(id);
  }

  public editAssignmentCategoryValue(
    id: string,
    body: UpdateBudgetCategoryAssignmentRequest,
  ) {
    this.budgetViewService.editAssignmentCategoryValue(id, body);
  }
}
