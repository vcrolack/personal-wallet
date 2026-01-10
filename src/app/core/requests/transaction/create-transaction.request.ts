export interface CreateTransactionRequest {
  amount: number;
  transactionDate: string;
  description: string;
  budgetId: string;
  bankId: number;
  transactionTypeId: number;
}
