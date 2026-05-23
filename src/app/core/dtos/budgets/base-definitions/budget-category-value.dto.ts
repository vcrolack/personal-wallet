import { BaseDTO } from '@core/dtos/base.dto';

export interface BudgetCategoryValueDTO extends BaseDTO {
  id: number;
  name: string;
  budgetCategoryId: number;
}
