import { Injectable } from '@angular/core';
import { BudgetTransactionsSummaryDTO } from '../../dtos';
import { BudgetTransactionsSummaryModel } from '../../models/transaction/transactions-summary/budget-transactions-summary.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsSummaryMapper {
  public toModel(
    dto: BudgetTransactionsSummaryDTO,
  ): BudgetTransactionsSummaryModel {
    return {
      budget: dto.budget,
      recentTransactions: dto.recentTransactions,
      unbudgetedExpenses: dto.unbudgetedExpenses,
      topCategoriesSpent: dto.topCategoriesSpent,
      totalTransactionsCount: dto.totalTransactionsCount,
    };
  }
}
