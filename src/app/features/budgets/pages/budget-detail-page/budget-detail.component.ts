import { Component, inject, input, effect, signal } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ButtonComponent } from '../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../common/components/ui/modal/modal.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';
import { BudgetDetailSkeletonComponent } from './components/budget-detail-skeleton/budget-detail-skeleton.component';

@Component({
  selector: 'app-budget-detail',
  imports: [
    HeroComponent,
    CategoriesListComponent,
    ButtonComponent,
    ModalComponent,
    AddCategoryComponent,
    BudgetDetailSkeletonComponent,
  ],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);

  public isModalOpen = signal<boolean>(false);

  public id = input.required<string>();

  public budget = this.budgetService.budgetResourceDetail;
  public isLoading = this.budgetService.budgetResourceDetail.isLoading;

  constructor() {
    effect(() => this.budgetService.selectBudget(this.id()));
  }

  public toggleModal() {
    this.isModalOpen.update((prev) => !prev);
  }
}
