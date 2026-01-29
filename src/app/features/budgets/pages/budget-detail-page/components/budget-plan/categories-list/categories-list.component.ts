import { CurrencyPipe, I18nPluralPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { IconButtonComponent } from '../../../../../../../common/components/form/icon-button/icon-button.component';
import { EditableFieldComponent } from '../../../../../../../common/components/ui/editable-field/editable-field.component';
import { ModalComponent } from '../../../../../../../common/components/ui/modal/modal.component';
import { EmptyStateComponent } from '../../../../../../../common/components/ui/empty-state/empty-state.component';
import { CreateCategoryValueAndAssignmentComponent } from '../../../forms/create-category-value-and-assignment/create-category-value-and-assignment.component';
import {
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  LucideAngularModule,
} from 'lucide-angular';
import { TitleComponent } from '../../../../../../../common/components/ui/typography/title/title.component';
import { TextComponent } from '../../../../../../../common/components/ui/typography/text/text.component';
import { BudgetViewService } from '../../../services/budgetView.service';
import { UpdateBudgetCategoryAssignmentRequest } from '../../../../../../../core/requests/budget-category-assignments/update-budget-category-assignment.request';

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
