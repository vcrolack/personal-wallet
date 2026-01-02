import { Component, computed, input, output, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../../../common/components/ui/modal/modal.component';
import { CreateCategoryValueAndAssignmentComponent } from './forms/create-category-value-and-assignment/create-category-value-and-assignment.component';

@Component({
  selector: 'app-categories-list',
  imports: [
    CurrencyPipe,
    WrapperComponent,
    ButtonComponent,
    ModalComponent,
    CreateCategoryValueAndAssignmentComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  public isModalOpen = signal<boolean>(false);
  public selectedCategoryId = signal<number | null>(null);

  public budget = input.required<BudgetModel>();

  public reloadBudgetResource = output<void>();

  public groupedCategories = computed(() => this.budget().groups);

  public toggleModal(categoryId?: number) {
    this.selectedCategoryId.set(categoryId ?? null);
    this.isModalOpen.update((prev) => !prev);
  }
}
