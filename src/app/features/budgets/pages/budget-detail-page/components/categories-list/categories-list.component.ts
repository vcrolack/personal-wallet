import { Component, computed, inject, input } from '@angular/core';
import { BudgetDetail } from '../../../../../../core/responses/find-one-budget.response';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import {
  BudgetMapperService,
  CategoryGroup,
} from '../../../../../../core/mappers/budget-mapper.service';
import { BudgetModel } from '../../../../../../core/models/budgets/budget.model';
import { BudgetGroupModel } from '../../../../../../core/models/budgets/budget-group.model';

@Component({
  selector: 'app-categories-list',
  imports: [CurrencyPipe, WrapperComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  private budgetMapperService = inject(BudgetMapperService);

  public budget = input.required<BudgetModel>();

  public groupedCategories = computed(() => this.budget().groups);
}
