export interface CreateTransactionRequest {
  amount: number;
  transactionDate: string;
  description: string;
  budgetId: string;
  bankId: number;
  transactionTypeId: number;
  assignments: Assignments[];
}

export interface Assignments {
  categoryValueId: number;
  amount: number;
}
