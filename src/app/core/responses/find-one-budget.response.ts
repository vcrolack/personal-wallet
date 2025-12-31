import { Budget } from '../interfaces/budget.interface';

export interface BudgetDetail extends Budget {
  userId: string;
  budgetCategoryAssignments: BudgetCategoryAssignment[];
}

export interface BudgetCategoryAssignment {
  id: string;
  allocatedAmount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  budgetCategoryValue: BudgetCategoryValue;
}

export interface BudgetCategoryValue {
  id: number;
  name: string;
  budgetCategoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  budgetCategory: BudgetCategory;
}

export interface BudgetCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
