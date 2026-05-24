import { Injectable } from '@angular/core';
import { TransactionDTO } from '@core/dtos/transaction/transaction.dto';
import { TransactionModel } from '@core/models/transaction/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionMapperService {
  public toModel(dto: TransactionDTO): TransactionModel {
    return {
      id: dto.id,
      amount: dto.amount,
      transactionDate: new Date(dto.transactionDate),
      description: dto.description,
      budgetId: dto.budgetId,
      bankId: dto.bankId,
      transactionTypeId: dto.transactionTypeId,
      userId: dto.userId,
      budget: dto.budget,
      bank: dto.bank,
      transactionType: dto.transactionType,
      transactionCategoryAssignments: dto.transactionCategoryAssignments.map(
        (assignment) => ({
          id: assignment.id,
          amount: assignment.amount,
          budgetCategoryValueId: assignment.budgetCategoryValueId,
          budgetCategoryValue: {
            id: assignment.budgetCategoryValue.id,
            name: assignment.budgetCategoryValue.name,
            budgetCategory: {
              id: assignment.budgetCategoryValue.budgetCategory.id,
              name: assignment.budgetCategoryValue.budgetCategory.name,
            },
          },
        }),
      ),
    };
  }
}
