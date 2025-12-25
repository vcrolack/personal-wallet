export interface CreateBudgetRequest {
  title: string;
  budgetAmount: number;
  description: string;
  startDate: string;
  endDate: string;
  isShared: boolean;
}
