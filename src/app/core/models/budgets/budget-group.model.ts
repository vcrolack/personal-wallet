import { CategoryRule } from '@core/models/categories/category.model';
import { CategoryAssignmentModel } from '@core/models/budgets/category-assignment.model';

export interface BudgetGroupModel {
  id: number;
  categoryName: string;
  rule: CategoryRule;
  assignments: CategoryAssignmentModel[];
  totalAllocated: number;
}
