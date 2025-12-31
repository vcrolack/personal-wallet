import { Component, input } from '@angular/core';
import {
  BudgetCategoryAssignment,
  BudgetDetail,
} from '../../../../../../core/responses/find-one-budget.response';
import { CurrencyPipe } from '@angular/common';
import { WrapperComponent } from '../../../../../../common/components/wrapper/wrapper.component';

interface CategoryGroup {
  categoryName: string;
  assignments: BudgetCategoryAssignment[];
  totalAllocated: number;
}

@Component({
  selector: 'app-categories-list',
  imports: [CurrencyPipe, WrapperComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  public budget = input.required<BudgetDetail>();

  public groupedCategories: CategoryGroup[] = [];

  ngOnInit() {
    this.processBudgetData(this.budget().budgetCategoryAssignments);
  }

  processBudgetData(assignments: BudgetCategoryAssignment[]) {
    const groups = assignments.reduce(
      (acc: Record<string, CategoryGroup>, curr: BudgetCategoryAssignment) => {
        const catName = curr.budgetCategoryValue.budgetCategory.name;

        if (!acc[catName]) {
          acc[catName] = {
            categoryName: catName,
            assignments: [],
            totalAllocated: 0,
          };
        }

        acc[catName].assignments.push(curr);
        acc[catName].totalAllocated += curr.allocatedAmount;

        return acc;
      },
      {}
    );

    console.log(groups);

    this.groupedCategories = Object.values(groups);
  }
}
