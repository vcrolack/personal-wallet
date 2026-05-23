import { BudgetCategoryAssignmentDTO } from '@core/dtos/budgets/base-definitions/budget-category-assignment.dto';
import { BudgetCategoryValueDTO } from '@core/dtos/budgets/base-definitions/budget-category-value.dto';
import { BudgetCategoryDTO } from '@core/dtos/budgets/base-definitions/budget-category.dto';
import { BudgetDTO } from '@core/dtos/budgets/base-definitions/budget.dto';

export interface BudgetCategoryValueWithCategoryDTO
  extends BudgetCategoryValueDTO {
  budgetCategory: BudgetCategoryDTO;
}

export interface BudgetAssignmentWithDetailsDTO
  extends BudgetCategoryAssignmentDTO {
  budgetCategoryValue: BudgetCategoryValueWithCategoryDTO;
}

export interface FullBudgetDTO extends BudgetDTO {
  budgetCategoryAssignments: BudgetAssignmentWithDetailsDTO[];
}
