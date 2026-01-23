import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { CategoryService } from '../../../../../core/services/category.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryModel } from '../../../../../core/models/categories/category.model';
import { BudgetCategoryRules } from '../../../../../core/enums/budget-category-rules.enum';

import { InputComponent } from '../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../common/components/form/button/button.component';
import { SelectComponent } from '../../../../../common/components/form/select/select.component';

@Component({
  selector: 'app-edit-category',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './edit-category.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategory {
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  public category = input.required<CategoryModel>();
  public rulesSelect = [
    { value: 'NEED', label: 'Necesidad' },
    { value: 'WANT', label: 'Lujos' },
    { value: 'SAVING', label: 'Ahorros' },
  ];

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    rule: ['', [Validators.required]],
  });

  public closeModal = output<void>();
  public refreshCategories = output<void>();

  constructor() {
    effect(() => {
      const category = this.category();
      this.form.patchValue({
        name: category.name,
        rule: this.rulesSelect.filter((rule) => rule.label === category.rule)[0]
          .value,
      });
    });
  }

  public editCategory() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.categoryService.update(this.category().id, this.form.value).subscribe({
      next: () => {
        this.refreshCategories.emit();
        this.closeModal.emit();
      },
      error: (error) => {
        console.error('Error updating category:', error);
      },
    });
  }
}
