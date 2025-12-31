import { BaseDTO } from '../../base.dto';

export interface BudgetCategoryValueDTO extends BaseDTO {
  id: number;
  name: string;
  budgetCategoryId: number;
}
