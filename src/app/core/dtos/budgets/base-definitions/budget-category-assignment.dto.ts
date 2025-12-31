import { BaseDTO } from '../../base.dto';

export interface BudgetCategoryAssignmentDTO extends BaseDTO {
  id: string;
  allocatedAmount: number;
}
