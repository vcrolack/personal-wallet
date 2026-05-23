import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AutocompleteComponent,
  AutocompleteOption,
} from '../../../../../../../../common/components/form/autocomplete/autocomplete.component';
import { IconButtonComponent } from '../../../../../../../../common/components/form/icon-button/icon-button.component';
import { InputComponent } from '../../../../../../../../common/components/form/input/input.component';
import { CategoryService } from '../../../../../../../../core/services/category.service';
import { BudgetCategoryValuesService } from '../../../../../../../../core/services/budget-category-values.service';
import { ErrorFormMessage } from '../../../../../../../../common/components/ui/error-form-message/error-form-message.component';

@Component({
  selector: 'app-transaction-assignment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutocompleteComponent,
    IconButtonComponent,
    InputComponent,
    ErrorFormMessage,
  ],
  providers: [CategoryService, BudgetCategoryValuesService],
  templateUrl: './transaction-assignment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionAssignmentComponent {
  public formGroup = input.required<FormGroup>();
  public remove = output<void>();

  private categoryService = inject(CategoryService);
  private valueService = inject(BudgetCategoryValuesService);

  public categories = this.categoryService.categoryResource.value;
  public values = this.valueService.categoryValuesResource.value;

  public categoryOptions = computed<AutocompleteOption[]>(() => {
    return (this.categories()?.data || []).map((c) => ({
      label: c.name,
      value: c.id,
    }));
  });

  public valueOptions = computed<AutocompleteOption[]>(() => {
    return (this.values()?.data || []).map((v) => ({
      label: v.name,
      value: v.id,
    }));
  });

  constructor() {
    this.categoryService.search('');

    // If form has value, try to load context?
    // Usually start empty for new transaction.
  }

  public onSearchCategory(query: string) {
    this.categoryService.search(query);
  }

  public onSelectCategory(categoryId: number) {
    this.valueService.selectCategory(categoryId);
    // Reset value because category changed
    this.formGroup().patchValue({ categoryValueId: null });
  }

  public onSearchValue(query: string) {
    this.valueService.search(query);
  }
}
