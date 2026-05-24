import {
  ChangeDetectionStrategy,
  Component,
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

import { CategoryService } from '@core/services';
import { CategoryModel } from '@core/models';
import {
  InputComponent,
  ButtonComponent,
  SelectComponent,
} from '@common/components/form';
import { ToastService } from '@common/components/ui';

@Component({
  selector: 'app-edit-category',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './edit-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategoryComponent {
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);
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
        this.toastService.show('Categoría editada correctamente', 'success');
        this.refreshCategories.emit();
        this.closeModal.emit();
      },
    });
  }
}
