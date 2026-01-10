import { BaseDTO } from '../base.dto';

export interface TransactionDTO extends BaseDTO {
  id: string;
  amount: number;
  transactionDate: string;
  description: string;
  budgetId: string;
  bankId: number;
  transactionTypeId: number;
  userId: string;
  budget: {
    id: string;
    title: string;
  };
  bank: {
    id: number;
    name: string;
  };
  transactionType: {
    id: number;
    name: string;
  };
}
