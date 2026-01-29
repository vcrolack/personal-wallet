import {
  Component,
  inject,
  input,
  effect,
  signal,
  computed,
} from '@angular/core';
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
import { TabsComponent } from '../../../../common/components/layout/tabs/tabs.component';
import { TabItem } from '../../../../common/interfaces/tab-item.interface';
import { BudgetTransactions } from './components/budget-transactions/budget-transactions.component';

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
    TabsComponent,
    BudgetTransactions,
  ],
  providers: [BudgetViewService],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);

  public isModalOpen = signal<boolean>(false);
  public viewMode = signal<ViewMode>('grid');
  public activeTabId = signal<string | number | undefined>(undefined);
  public tabs = signal<TabItem[]>([
    {
      id: 0,
      label: 'Presupuesto',
    },
    {
      id: 1,
      label: 'Transacciones',
    },
  ]);

  public id = input.required<string>();

  public budget = this.budgetService.budgetResourceDetail;
  public isLoading = this.budgetService.budgetResourceDetail.isLoading;

  public disabledSwitcherView = computed(() => this.activeTabId() !== 0);
  public isAddCategory = computed(() => {
    if (this.activeTabId() === 0) {
      return 'Agregar categoría';
    }
    return 'Registrar transacción';
  });

  constructor() {
    effect(() => this.budgetService.selectBudget(this.id()));
    effect(() => {
      const currentTabs = this.tabs();
      if (currentTabs.length > 0 && this.activeTabId() === undefined) {
        this.activeTabId.set(currentTabs[0].id);
      }
    });
  }

  public toggleModal() {
    this.isModalOpen.update((prev) => !prev);
  }

  public setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }
}
