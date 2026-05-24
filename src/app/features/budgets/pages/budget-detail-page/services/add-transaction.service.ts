import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  BankService,
  TransactionTypeService,
  TransactionsService,
} from '@core/services';
import { CreateTransactionRequest } from '@core/requests';

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
