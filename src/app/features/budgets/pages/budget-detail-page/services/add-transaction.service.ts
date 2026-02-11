import { inject, Injectable } from '@angular/core';
import { BankService } from '../../../../../core/services/bank.service';
import { TransactionTypeService } from '../../../../../core/services/transaction-type.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class AddTransactionService {
  private bankService = inject(BankService);
  private transactionTypeService = inject(TransactionTypeService);

  public banks = toSignal(this.bankService.findAll(100, 1), {
    initialValue: [],
  });
  public transactionTypes = toSignal(
    this.transactionTypeService.findAll(100, 1),
    { initialValue: [] },
  );
}
