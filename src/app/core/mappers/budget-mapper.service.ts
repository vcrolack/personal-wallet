import { Injectable } from '@angular/core';
import { BudgetCategoryAssignment } from '../responses/find-one-budget.response';
import {
  BudgetAssignmentWithDetailsDTO,
  FullBudgetDTO,
} from '../dtos/budgets/compose-definitions/full-budget.dto';
import { BudgetModel } from '../models/budgets/budget.model';
import { BudgetGroupModel } from '../models/budgets/budget-group.model';
import { CategoryAssignmentModel } from '../models/budgets/category-assignment.model';

export interface CategoryGroup {
  categoryName: string;
  assignments: BudgetCategoryAssignment[];
  totalAllocated: number;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetMapperService {
  public toModel(dto: FullBudgetDTO): BudgetModel {
    const groups = this.transformToGroups(dto.budgetCategoryAssignments);
    const totalSpent = groups.reduce((acc, g) => acc + g.totalAllocated, 0);

    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      budgetAmount: dto.budgetAmount,
      totalSpent,
      percentageSpent: (totalSpent / dto.budgetAmount) * 100,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isShared: dto.isShared,
      groups,
    };
  }

  transformToGroups(
    assignments: BudgetAssignmentWithDetailsDTO[]
  ): BudgetGroupModel[] {
    const groups = assignments.reduce(
      (
        acc: Record<string, BudgetGroupModel>,
        curr: BudgetAssignmentWithDetailsDTO
      ) => {
        const catName = curr.budgetCategoryValue.budgetCategory.name;

        if (!acc[catName]) {
          acc[catName] = {
            categoryName: catName,
            assignments: [],
            totalAllocated: 0,
          };
        }

        const assignmentModel: CategoryAssignmentModel = {
          id: curr.id,
          categoryName: catName,
          categoryValueName: curr.budgetCategoryValue.name,
          allocatedAmount: curr.allocatedAmount,
        };

        acc[catName].assignments.push(assignmentModel);
        acc[catName].totalAllocated += curr.allocatedAmount;

        return acc;
      },
      {} as Record<string, BudgetGroupModel>
    );

    return Object.values(groups);
  }
}
