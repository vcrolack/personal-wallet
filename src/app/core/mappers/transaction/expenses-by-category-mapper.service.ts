import { Injectable } from '@angular/core';
import { GetExpensesByCategoryDTO } from '@core/dtos';
import { ExpensesByCategoryModel } from '@core/models';

@Injectable({ providedIn: 'root' })
export class ExpensesByCategoryMapperService {
  public toModel(dto: GetExpensesByCategoryDTO): ExpensesByCategoryModel {
    return {
      categories: dto.categories.map((c) => ({
        id: c.id,
        categoryName: c.categoryName,
        rule: c.rule,
        totalAllocated: c.totalAllocated,
        totalSpent: c.totalSpent,
        assignments: c.assignments.map((a) => ({
          id: a.id,
          categoryValueId: a.categoryValueId,
          categoryValueName: a.categoryValueName,
          allocatedAmount: a.allocatedAmount,
          spentAmount: a.spentAmount,
        })),
      })),
      unbudgetedExpenses: dto.unbudgetedExpenses.map((u) => ({
        id: u.id,
        categoryName: u.categoryName,
        totalSpent: u.totalSpent,
        subcategories: u.subcategories.map((s) => ({
          categoryValueId: s.categoryValueId,
          categoryValueName: s.categoryValueName,
          spentAmount: s.spentAmount,
        })),
      })),
    };
  }
}
