import { CurrencyPipe, I18nPluralPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import {
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  LucideAngularModule,
} from 'lucide-angular';

import { IconButtonComponent } from '@common/components/form';
import {
  EditableFieldComponent,
  ModalComponent,
  EmptyStateComponent,
  TitleComponent,
  TextComponent,
} from '@common/components/ui';
import { CreateCategoryValueAndAssignmentComponent } from '@features/budgets/pages/budget-detail-page/forms/create-category-value-and-assignment/create-category-value-and-assignment.component';
import { BudgetViewService } from '@features/budgets/pages/budget-detail-page/services/budgetView.service';
import { UpdateBudgetCategoryAssignmentRequest } from '@core/requests';

@Component({
  selector: 'app-categories-list',
  imports: [
    CurrencyPipe,
    IconButtonComponent,
    EditableFieldComponent,
    ModalComponent,
    EmptyStateComponent,
    CreateCategoryValueAndAssignmentComponent,
    LucideAngularModule,
    TitleComponent,
    TextComponent,
    I18nPluralPipe,
  ],
  templateUrl: './categories-list.component.html',
})
export class CategoriesList {
  private budgetViewService = inject(BudgetViewService);
  public collapsedCategories = signal<Set<number>>(new Set());

  public conceptsMap = signal({
    '=0': 'sin conceptos',
    '=1': '1 concepto',
    other: '# conceptos',
  });

  public chevronDown = ChevronDown;
  public chevronRight = ChevronRight;

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

  public toggleCategory(categoryId: number) {
    this.collapsedCategories.update((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
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
