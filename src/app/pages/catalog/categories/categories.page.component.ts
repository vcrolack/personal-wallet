import { Component, computed, effect, inject, signal } from '@angular/core';
import { TabsComponent } from '../../../common/components/tabs/tabs.component';
import { TabItem } from '../../../common/interfaces/tab-item.interface';
import { HeaderComponent } from '../../../common/components/header/header.component';
import { CategoryService } from '../../../core/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BudgetCategoryValuesService } from '../../../core/services/budget-category-values.service';

@Component({
  selector: 'app-categories.page',
  imports: [TabsComponent, HeaderComponent],
  templateUrl: './categories.page.component.html',
  styleUrl: './categories.page.component.css',
})
export class CategoriesPageComponent {
  private categoryService = inject(CategoryService);
  private categoryValuesService = inject(BudgetCategoryValuesService);

  public activeTabId = signal<string | number | undefined>(undefined);

  constructor() {
    effect(() => {
      const currentTabs = this.tabs();
      if (currentTabs.length > 0 && this.activeTabId() === undefined) {
        this.activeTabId.set(currentTabs[0].id);
      }
    });
  }

  public categoryResource = rxResource({
    request: () => ({ limit: 10, offset: 0 }),
    loader: ({ request }) => {
      return this.categoryService.findAll(request.limit, request.offset);
    },
  });

  public categoryValuesResource = rxResource({
    request: () => ({
      limit: 10,
      offset: 0,
      budgetCategoryId: this.activeTabId(),
    }),
    loader: ({ request }) => {
      return this.categoryValuesService.findAll(
        request.limit,
        request.offset,
        request.budgetCategoryId as number
      );
    },
  });

  public tabs = computed<TabItem[]>(() => {
    const response = this.categoryResource.value();
    if (!response?.data) return [];

    return response.data.map((category) => ({
      label: category.name,
      id: category.id,
    }));
  });
}
