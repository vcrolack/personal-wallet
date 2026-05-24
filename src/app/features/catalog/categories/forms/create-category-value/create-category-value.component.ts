import { Component, computed, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  SelectComponent,
  SelectOption,
  ButtonComponent,
  InputComponent,
} from '@common/components/form';
import { ToastService, ErrorFormMessage } from '@common/components/ui';
import { BudgetCategoryValuesService } from '@core/services';
import { CategoryModel } from '@core/models';

@Component({
  selector: 'app-create-category-value',
  imports: [
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ErrorFormMessage,
  ],
  templateUrl: './create-category-value.component.html',
  styleUrl: './create-category-value.component.css',
})
export class CreateCategoryValueComponent {
  private budgetCategoryValueService = inject(BudgetCategoryValuesService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  public form: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
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
        next: () => {
          this.toastService.show(
            'Valor de categoría creado correctamente',
            'success',
          );
          this.form.reset();
          this.refreshCategories.emit();
          this.closeModal.emit();
        },
      });
  }
}
