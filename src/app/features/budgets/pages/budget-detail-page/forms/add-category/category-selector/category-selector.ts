import {
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CategoryService } from '../../../../../../../core/services/category.service';
import {
  AutocompleteOption,
  AutocompleteComponent,
} from '../../../../../../../common/components/form/autocomplete/autocomplete.component';
import { BudgetGroupModel } from '../../../../../../../core/models/budgets/budget-group.model';
import { BudgetService } from '../../../../../../../core/services/budget.service';
import { catchError, finalize, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BudgetCategoryRules } from '../../../../../../../core/enums/budget-category-rules.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  imports: [AutocompleteComponent, ReactiveFormsModule],
  templateUrl: './category-selector.html',
})
export class CategorySelector {
  private categoryService = inject(CategoryService);
  private budgetService = inject(BudgetService);

  public form = input.required<FormGroup>();

  public categoryResource = this.categoryService.categoryResource;
  public budgetDetailResource = this.budgetService.budgetResourceDetail;
  public isLoading = signal<boolean>(false);

  public categoriesForSelect = computed((): AutocompleteOption[] => {
    const response = this.categoryResource.value();
    if (!response || Array.isArray(response)) return [];

    const allCategories = response.data;
    const assignedCategoryIds =
      this.budgetDetailResource
        .value()
        ?.groups.map((g: BudgetGroupModel) => g.id) ?? [];

    return allCategories
      .filter((category) => !assignedCategoryIds.includes(category.id))
      .map((category) => ({
        label: category.name,
        value: category.id,
      }));
  });

  public searchCategory(term: string) {
    this.categoryService.search(term);
  }

  public createCategory(name: string) {
    this.categoryService
      .create({
        name,
        rule: BudgetCategoryRules.WANT,
      })
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.error?.message));
        }),
      )
      .subscribe({
        next: (category) => {
          this.categoryService.reloadList();
          this.form().patchValue({ category: category.id });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
