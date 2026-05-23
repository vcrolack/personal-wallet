import { CreateTransactionTypeRequest } from '@core/requests/transaction/transaction-type/create-transaction-type.request';

export interface UpdateTransactionTypeRequest
  extends Partial<CreateTransactionTypeRequest> {}
