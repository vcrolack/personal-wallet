import { CreateBankRequest } from './create-bank.request';

export interface UpdateBankRequest extends Partial<CreateBankRequest> {}
