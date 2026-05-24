export interface TransactionModel {
  id: string;
  amount: number;
  transactionDate: Date;
  description: string;
  budgetId: string;
  bankId: number;
  transactionTypeId: number;
  userId: string;
  budget?: {
    id: string;
    title: string;
  };
  bank?: {
    id: number;
    name: string;
  };
  transactionType?: {
    id: number;
    name: string;
  };
  transactionCategoryAssignments: TransactionCategoryAssignmentModel[];
}

export interface TransactionCategoryAssignmentModel {
  id: string;
  amount: number;
  budgetCategoryValueId: string;
  createdAt: Date;
  budgetCategoryValue?: {
    id: string;
    name: string;
    budgetCategory?: {
      id: string;
      name: string;
    };
  };
}
