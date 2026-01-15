import { BudgetCategoryRules } from '../../../enums/budget-category-rules.enum';
import { BaseDTO } from '../../base.dto';

export interface BudgetCategoryDTO extends BaseDTO {
  id: number;
  name: string;
  rule: BudgetCategoryRules;
}
