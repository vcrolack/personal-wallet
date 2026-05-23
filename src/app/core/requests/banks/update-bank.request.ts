import { CreateBankRequest } from '@core/requests/banks/create-bank.request';

export interface UpdateBankRequest extends Partial<CreateBankRequest> {}
