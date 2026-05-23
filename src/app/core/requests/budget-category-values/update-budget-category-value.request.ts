import { CreateBudgetCategoryValue } from '@core/requests/budget-category-values/create-budget-category-value.request';

export interface UpdateBudgetCategoryValueRequest
  extends Partial<CreateBudgetCategoryValue> {}
