import { BudgetCategoryRules } from '../../enums/budget-category-rules.enum';

export interface CreateCategoryRequest {
  name: string;
  rule: BudgetCategoryRules;
}
