import { CategoryRule } from '../categories/category.model';
import { CategoryAssignmentModel } from './category-assignment.model';

export interface BudgetGroupModel {
  id: number;
  categoryName: string;
  rule: CategoryRule;
  assignments: CategoryAssignmentModel[];
  totalAllocated: number;
}
