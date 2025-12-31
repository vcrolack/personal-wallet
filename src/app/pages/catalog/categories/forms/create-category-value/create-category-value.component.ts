import { Component, computed, inject, input, output } from '@angular/core';
import { InputComponent } from '../../../../../common/components/form/input/input.component';
import {
  SelectComponent,
  SelectOption,
} from '../../../../../common/components/form/select/select.component';
import { Category } from '../../../../../core/interfaces/category.interface';
import { ButtonComponent } from '../../../../../common/components/form/button/button.component';
import { BudgetCategoryValuesService } from '../../../../../core/services/budget-category-values.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryModel } from '../../../../../core/models/categories/category.model';

@Component({
  selector: 'app-create-category-value',
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-category-value.component.html',
  styleUrl: './create-category-value.component.css',
})
export class CreateCategoryValueComponent {
  private budgetCategoryValueService = inject(BudgetCategoryValuesService);
  private fb = inject(FormBuilder);

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    budgetCategoryId: ['', Validators.required],
  });

  public categories = input<CategoryModel[]>([]);
  public categoriesForSelect = computed((): SelectOption[] => {
    return this.categories().map((category) => ({
      label: category.name,
      value: category.id,
    }));
  });

  public refreshCategories = output<void>();
  public closeModal = output<void>();

  public createBudgetCategoryValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.budgetCategoryValueService
      .create({
        name: this.form.get('name')?.value,
        budgetCategoryId: +this.form.get('budgetCategoryId')?.value,
      })
      .subscribe({
        next: (response) => {
          console.log('Valor de categoría creado: ', response);
          this.form.reset();
          this.refreshCategories.emit();
          this.closeModal.emit();
        },
        error: (error) => {
          console.error('Error al crear valor de categoría: ', error);
        },
      });
  }
}
