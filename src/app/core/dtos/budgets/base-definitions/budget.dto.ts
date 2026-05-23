import { BaseDTO } from '@core/dtos/base.dto';

export interface BudgetDTO extends BaseDTO {
  id: string;
  title: string;
  budgetAmount: number;
  description: string;
  startDate: string;
  endDate: string;
  isShared: boolean;
  userId: string;
}
