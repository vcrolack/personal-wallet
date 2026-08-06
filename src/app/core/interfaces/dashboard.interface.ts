export interface ActiveBudgetSummary {
  id: string;
  title: string;
  totalAllocated: number;
  spentAmount: number;
  remainingAmount: number;
  daysRemaining: number;
  dailySpendsAllowance: number;
  monthlyBudgetBurnPercentage: number;
}

export interface UnbudgetedExpenses {
  totalAmount: number;
  transactionCount: number;
}

export interface KpiSummary {
  totalSpent: number;
  totalTransactionsCount: number;
  averageTransactionAmount: number;
  unbudgetedExpenses: UnbudgetedExpenses;
}

export interface FinancialRuleBreakdown {
  rule: string;
  name: string;
  targetPercentage: number;
  totalSpent: number;
  percentageOfTotalSpent: number;
}

export interface TopCategorySpent {
  categoryId: number;
  categoryName: string;
  totalSpent: number;
  percentageOfTotalSpent: number;
}

export interface BankDistribution {
  bankId: number;
  bankName: string;
  totalSpent: number;
  transactionCount: number;
  percentageOfTotalSpent: number;
}

export interface RecentTransaction {
  id: string;
  description: string;
  amount: number;
  transactionDate: string; // ISO String
  bankName: string;
  categoryName: string;
  budgetTitle: string;
}

export interface MonthlyTrend {
  month: string; // YYYY-MM
  totalSpent: number;
  transactionCount: number;
}

export interface DashboardResponse {
  activeBudgetSummary: ActiveBudgetSummary;
  kpiSummary: KpiSummary;
  financialRuleBreakdown: FinancialRuleBreakdown[];
  topCategoriesSpent: TopCategorySpent[];
  bankDistribution: BankDistribution[];
  recentTransactions: RecentTransaction[];
  monthlyTrends: MonthlyTrend[];
}
