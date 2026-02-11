import { inject, Injectable } from '@angular/core';
import { BankService } from '../../../../../core/services/bank.service';
import { TransactionTypeService } from '../../../../../core/services/transaction-type.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TransactionsService } from '../../../../../core/services/transactions.service';
import { CreateTransactionRequest } from '../../../../../core/requests/transaction/create-transaction.request';

@Injectable()
export class AddTransactionService {
  private bankService = inject(BankService);
  private transactionTypeService = inject(TransactionTypeService);
  private transactionService = inject(TransactionsService);

  public banks = toSignal(this.bankService.findAll(100, 1), {
    initialValue: [],
  });
  public transactionTypes = toSignal(
    this.transactionTypeService.findAll(100, 1),
    { initialValue: [] },
  );

  public createTransaction(createTransactionRequest: CreateTransactionRequest) {
    return this.transactionService.create(createTransactionRequest);
  }
}
