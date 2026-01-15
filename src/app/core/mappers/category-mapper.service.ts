import { Injectable } from '@angular/core';
import { BudgetCategoryDTO } from '../dtos/budgets/base-definitions/budget-category.dto';
import {
  CategoryModel,
  CategoryRule,
} from '../models/categories/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryMapperService {
  public toModel(dto: BudgetCategoryDTO): CategoryModel {
    return {
      id: dto.id,
      name: dto.name,
      rule: CategoryRule[dto.rule],
    };
  }
}
