import { Injectable } from '@angular/core';
import { BudgetCategoryValueDTO } from '../dtos/budgets/base-definitions/budget-category-value.dto';
import { CategoryValueModel } from '../models/categories/category-value.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryValueMapperService {
  public toModel(dto: BudgetCategoryValueDTO): CategoryValueModel {
    return {
      id: dto.id,
      name: dto.name,
      categoryId: dto.budgetCategoryId,
    };
  }
}
