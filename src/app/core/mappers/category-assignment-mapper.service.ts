import { Injectable } from '@angular/core';
import { BudgetCategoryAssignmentDTO } from '../dtos/categories/budget-category-assignments.dto';
import { CategoryAssignmentModel } from '../models/categories/category-assignment.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryAssignmentMapperService {
  public toModel(dto: BudgetCategoryAssignmentDTO): CategoryAssignmentModel {
    return {
      id: dto.id,
      budgetId: dto.budgetId,
      categoryValueId: dto.budgetCategoryValueId,
      allocatedAmount: dto.allocatedAmount,
    };
  }
}
