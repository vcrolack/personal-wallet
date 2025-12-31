import { Component, inject, input } from '@angular/core';
import { BudgetDetail } from '../../../../../../core/responses/find-one-budget.response';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/wrapper/wrapper.component';
import {
  BudgetMapperService,
  CategoryGroup,
} from '../../../../../../core/mappers/budget-mapper.service';

@Component({
  selector: 'app-categories-list',
  imports: [CurrencyPipe, WrapperComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  private budgetMapperService = inject(BudgetMapperService);

  public budget = input.required<BudgetDetail>();

  public groupedCategories: CategoryGroup[] = [];

  ngOnInit() {
    this.groupedCategories = this.budgetMapperService.processBudgetData(
      this.budget().budgetCategoryAssignments
    );
  }
}
