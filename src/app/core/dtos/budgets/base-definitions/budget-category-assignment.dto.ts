import { BaseDTO } from '@core/dtos/base.dto';

export interface BudgetCategoryAssignmentDTO extends BaseDTO {
  id: string;
  allocatedAmount: number;
}
