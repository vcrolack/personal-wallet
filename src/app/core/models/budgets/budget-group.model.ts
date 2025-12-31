import { CategoryAssignmentModel } from './category-assignment.model';

export interface BudgetGroupModel {
  categoryName: string;
  assignments: CategoryAssignmentModel[];
  totalAllocated: number;
}
