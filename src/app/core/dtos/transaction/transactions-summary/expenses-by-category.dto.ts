export interface GetExpensesByCategoryDTO {
  categories: {
    id: number;
    categoryName: string;
    rule: string;
    totalAllocated: number;
    totalSpent: number;
    assignments: {
      id: string;
      categoryValueId: number;
      categoryValueName: string;
      allocatedAmount: number;
      spentAmount: number;
    }[];
  }[];

  unbudgetedExpenses: {
    id: number;
    categoryName: string;
    totalSpent: number;
    subcategories: {
      categoryValueId: number;
      categoryValueName: string;
      spentAmount: number;
    }[];
  }[];
}
