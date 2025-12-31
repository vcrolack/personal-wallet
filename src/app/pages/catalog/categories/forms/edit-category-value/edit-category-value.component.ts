import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetCategoryValuesService } from '../../../../../core/services/budget-category-values.service';
import { BudgetCategoryValue } from '../../../../../core/interfaces/budget-category-value.interface';
import { ButtonComponent } from '../../../../../common/components/form/button/button.component';
import {
  SelectComponent,
  SelectOption,
} from '../../../../../common/components/form/select/select.component';
import { InputComponent } from '../../../../../common/components/form/input/input.component';
import { CategoryValueModel } from '../../../../../core/models/categories/category-value.model';
import { CategoryModel } from '../../../../../core/models/categories/category.model';

@Component({
  selector: 'app-edit-category-value',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    InputComponent,
  ],
  templateUrl: './edit-category-value.component.html',
  styleUrl: './edit-category-value.component.css',
})
export class EditCategoryValueComponent {
  private budgetCategoryValueService = inject(BudgetCategoryValuesService);
  private fb = inject(FormBuilder);

  public categoryValue = input.required<CategoryValueModel>();
  public categories = input<CategoryModel[]>([]);
  public categoriesForSelect = computed<SelectOption[]>(() => {
    return this.categories().map((category) => ({
      label: category.name,
      value: category.id,
    }));
  });

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    categoryId: [null, Validators.required],
  });

  public closeModal = output<void>();
  public refreshCategoryValues = output<void>();

  constructor() {
    effect(() => {
      const value = this.categoryValue();
      this.form.patchValue({
        name: value.name,
        categoryId: value.categoryId,
      });
    });
  }

  public editCategoryValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.budgetCategoryValueService
      .update(this.categoryValue().id, this.form.value)
      .subscribe({
        next: () => {
          this.refreshCategoryValues.emit();
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Error updating category value:', error);
        },
      });
  }
}
