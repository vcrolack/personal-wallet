import {
  Component,
  inject,
  input,
  effect,
  signal,
  computed,
} from '@angular/core';

import { BudgetService } from '@core/services/budget.service';
import { HeroComponent } from '@features/budgets/pages/budget-detail-page/components/hero/hero.component';
import { ButtonComponent } from '@common/components/form';
import { AddCategoryComponent } from '@features/budgets/pages/budget-detail-page/forms/add-category/add-category.component';
import {
  ViewSwitcherComponent,
  ViewMode,
  ModalComponent,
  ModalSize,
} from '@common/components/ui';
import { BudgetViewService } from '@features/budgets/pages/budget-detail-page/services/budgetView.service';
import { CategoriesGridComponent } from '@features/budgets/pages/budget-detail-page/components/budget-plan/categories-grid/categories-grid.component';
import { BudgetDetailSkeletonComponent } from '@features/budgets/pages/budget-detail-page/components/budget-plan/budget-detail-skeleton/budget-detail-skeleton.component';
import { VisualResumeComponent } from '@features/budgets/pages/budget-detail-page/components/budget-plan/visual-resume/visual-resume.component';
import { CategoriesList } from '@features/budgets/pages/budget-detail-page/components/budget-plan/categories-list/categories-list.component';
import { TabsComponent, TabItem } from '@common/components/layout';
import { BudgetTransactions } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/budget-transactions.component';
import { TransactionsVisualResume } from '@features/budgets/pages/budget-detail-page/components/budget-transactions/components/transactions-visual-resume/transactions-visual-resume.component';
import { AddTransactionComponent } from '@features/budgets/pages/budget-detail-page/forms/add-transaction/add-transaction.component';

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
    TransactionsVisualResume,
    AddTransactionComponent,
  ],
  providers: [BudgetViewService],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);

  public modalOption = signal<'add-category' | 'add-transaction' | null>(null);
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

  public modalSize = computed<ModalSize>(() => {
    if (this.modalOption() === 'add-transaction') return 'large';
    return 'medium';
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

  public toggleModal(option: 'add-category' | 'add-transaction' | null) {
    this.modalOption.set(option);
    this.isModalOpen.update((prev) => !prev);
  }

  public setViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }
}
