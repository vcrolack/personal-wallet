import { Injectable } from '@angular/core';
import { BudgetCategoryAssignment } from '../responses/find-one-budget.response';

export interface CategoryGroup {
  categoryName: string;
  assignments: BudgetCategoryAssignment[];
  totalAllocated: number;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetMapperService {
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

    return Object.values(groups);
  }
}
