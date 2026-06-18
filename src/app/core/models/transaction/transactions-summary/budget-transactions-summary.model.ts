export interface BudgetTransactionsSummaryModel {
  budget: {
    totalAllocated: number;
    allocatedAvailable: number;
    spentAmount: number;
    remainingAmount: number;
    daysRemaining: number;
    dailySpendsAllowance: number;
    monthlyBudgetBurnPercentage: number;
  };

  recentTransactions: {
    description: string;
    amount: number;
  }[];

  unbudgetedExpenses: {
    totalAmount: number;
    transactionCount: number;
  };

  topCategoriesSpent: {
    categoryName: string;
    totalAmount: number;
  }[];

  totalTransactionsCount: number;
}
