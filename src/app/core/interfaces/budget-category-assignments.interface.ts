import { BudgetCategoryValue } from './budget-category-value.interface';

export interface BudgetCategoryAssignments {
  id: string;
  allocatedAmount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
