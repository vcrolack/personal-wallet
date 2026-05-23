import { BudgetCategoryRules } from '@core/enums/budget-category-rules.enum';
import { BaseDTO } from '@core/dtos/base.dto';

export interface BudgetCategoryDTO extends BaseDTO {
  id: number;
  name: string;
  rule: BudgetCategoryRules;
}
