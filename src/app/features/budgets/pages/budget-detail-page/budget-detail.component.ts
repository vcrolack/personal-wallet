import { Component, inject, input, effect, signal } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { HeroComponent } from './components/hero/hero.component';

import { ButtonComponent } from '../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../common/components/ui/modal/modal.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';

import {
  ViewSwitcherComponent,
  ViewMode,
} from '../../../../common/components/ui/view-switcher/view-switcher.component';

import { BudgetViewService } from './services/budgetView.service';
import { CategoriesGridComponent } from './components/budget-plan/categories-grid/categories-grid.component';
import { BudgetDetailSkeletonComponent } from './components/budget-plan/budget-detail-skeleton/budget-detail-skeleton.component';
import { VisualResumeComponent } from './components/budget-plan/visual-resume/visual-resume.component';
import { CategoriesList } from './components/budget-plan/categories-list/categories-list.component';

@Component({
  selector: 'app-budget-detail',
  imports: [
    HeroComponent,
    CategoriesGridComponent,
    ButtonComponent,
    ModalComponent,
    AddCategoryComponent,
    BudgetDetailSkeletonComponent,
    VisualResumeComponent,
    ViewSwitcherComponent,
    CategoriesList,
  ],
  providers: [BudgetViewService],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);

  public isModalOpen = signal<boolean>(false);
  public viewMode = signal<ViewMode>('grid');

  public id = input.required<string>();

  public budget = this.budgetService.budgetResourceDetail;
  public isLoading = this.budgetService.budgetResourceDetail.isLoading;

  constructor() {
    effect(() => this.budgetService.selectBudget(this.id()));
  }

  public toggleModal() {
    this.isModalOpen.update((prev) => !prev);
  }

  public setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }
}
