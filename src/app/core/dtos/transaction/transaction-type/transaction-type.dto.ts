import { BaseDTO } from '@core/dtos/base.dto';

export interface TransactionTypeDTO extends BaseDTO {
  id: number;
  name: string;
}
