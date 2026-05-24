import { BaseDTO } from '@core/dtos/base.dto';

export interface TransactionDTO extends BaseDTO {
  id: string;
  amount: number;
  transactionDate: string;
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
  transactionCategoryAssignments: {
    id: string;
    amount: number;
    budgetCategoryValueId: string;
    createdAt: string;
    budgetCategoryValue?: {
      id: string;
      name: string;
      budgetCategory?: {
        id: string;
        name: string;
      };
    };
  }[];
}
