import { BudgetCategoryRules } from '@core/enums/budget-category-rules.enum';

export interface CreateCategoryRequest {
  name: string;
  rule: BudgetCategoryRules;
}
