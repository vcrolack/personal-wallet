import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CircleDollarSign } from 'lucide-angular';

import {
  WrapperComponent,
  ModalComponent,
  EmptyStateComponent,
  EditableFieldComponent,
  TitleComponent,
  TextComponent,
} from '@common/components/ui';
import { ButtonComponent, IconButtonComponent } from '@common/components/form';
import { UpdateBudgetCategoryAssignmentRequest } from '@core/requests/budget-category-assignments/update-budget-category-assignment.request';
import { CreateCategoryValueAndAssignmentComponent } from '@features/budgets/pages/budget-detail-page/forms/create-category-value-and-assignment/create-category-value-and-assignment.component';
import { BudgetViewService } from '@features/budgets/pages/budget-detail-page/services/budgetView.service';

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
    TitleComponent,
    TextComponent,
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
