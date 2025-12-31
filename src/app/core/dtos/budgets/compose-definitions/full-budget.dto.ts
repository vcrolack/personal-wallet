import { BudgetCategoryAssignmentDTO } from '../base-definitions/budget-category-assignment.dto';
import { BudgetCategoryValueDTO } from '../base-definitions/budget-category-value.dto';
import { BudgetCategoryDTO } from '../base-definitions/budget-category.dto';
import { BudgetDTO } from '../base-definitions/budget.dto';

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
