import { Injectable } from '@angular/core';
import { TransactionDTO } from '../dtos/transaction/transaction.dto';
import { TransactionModel } from '../models/transaction/transaction.model';

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
    };
  }
}
