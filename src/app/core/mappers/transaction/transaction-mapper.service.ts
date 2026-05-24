import { Injectable } from '@angular/core';
import { TransactionDTO } from '@core/dtos';
import { TransactionModel } from '@core/models';

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
      budget: dto.budget
        ? {
            id: dto.budget.id,
            title: dto.budget.title,
          }
        : undefined,
      bank: dto.bank
        ? {
            id: dto.bank.id,
            name: dto.bank.name,
          }
        : undefined,
      transactionType: dto.transactionType
        ? {
            id: dto.transactionType.id,
            name: dto.transactionType.name,
          }
        : undefined,
      transactionCategoryAssignments: dto.transactionCategoryAssignments?.map(
        (assignment) => ({
          id: assignment.id,
          amount: assignment.amount,
          budgetCategoryValueId: assignment.budgetCategoryValueId,
          createdAt: new Date(assignment.createdAt),
          budgetCategoryValue: assignment.budgetCategoryValue
            ? {
                id: assignment.budgetCategoryValue.id,
                name: assignment.budgetCategoryValue.name,
                budgetCategory: assignment.budgetCategoryValue.budgetCategory
                  ? {
                      id: assignment.budgetCategoryValue.budgetCategory.id,
                      name: assignment.budgetCategoryValue.budgetCategory.name,
                    }
                  : undefined,
              }
            : undefined,
        }),
      ) ?? [],
    };
  }
}
