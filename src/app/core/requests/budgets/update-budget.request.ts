import { CreateBudgetRequest } from '@core/requests/budgets/create-budget.request';

export interface UpdateBudgetRequest extends Partial<CreateBudgetRequest> {}
