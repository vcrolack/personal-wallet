import { BaseDTO } from '../base.dto';

export interface BudgetCategoryAssignmentDTO extends BaseDTO {
  id: string;
  budgetId: string;
  budgetCategoryValueId: number;
  allocatedAmount: number;
}
