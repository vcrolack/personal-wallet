import { Component, computed, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../../../../core/services/category.service';
import { BudgetCategoryValuesService } from '../../../../../../core/services/budget-category-values.service';
import {
  SelectOption,
  SelectComponent,
} from '../../../../../../common/components/form/select/select.component';
import { InputComponent } from '../../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  private categoryService = inject(CategoryService);
  private categoryValueService = inject(BudgetCategoryValuesService);
  private fb = inject(FormBuilder);

  public categoryResource = this.categoryService.categoryResource;
  public categoryValuesResource =
    this.categoryValueService.categoryValuesResource;

  public categoriesForSelect = computed(
    (): SelectOption[] =>
      this.categoryResource.value()?.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? []
  );

  public form: FormGroup = this.fb.group({
    category: [null, Validators.required],
    categoryValue: [null, Validators.required],
    amount: [null, Validators.required],
  });

  public categoryId = toSignal(this.form.get('category')!.valueChanges, {
    initialValue: null,
  });

  public categoryValueId = toSignal(
    this.form.get('categoryValue')!.valueChanges,
    {
      initialValue: null,
    }
  );

  public categoryValuesForSelect = computed(
    (): SelectOption[] =>
      this.categoryValuesResource.value()?.map((categoryValue) => ({
        label: categoryValue.name,
        value: categoryValue.id,
      })) ?? []
  );

  constructor() {
    effect(() => {
      const categoryId = this.categoryId();
      if (categoryId) {
        this.categoryValueService.selectCategory(categoryId);
      }
    });
  }
}
