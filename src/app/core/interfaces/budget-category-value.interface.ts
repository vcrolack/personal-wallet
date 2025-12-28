export interface BudgetCategoryValue {
  id: number;
  name: string;
  budgetCategory: { id: number };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
