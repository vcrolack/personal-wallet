import { CategoryAssignmentModel } from './category-assignment.model';

export interface BudgetGroupModel {
  id: number;
  categoryName: string;
  assignments: CategoryAssignmentModel[];
  totalAllocated: number;
}
