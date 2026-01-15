import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../common/components/form/button/button.component';
import { CategoryService } from '../../../../../core/services/category.service';
import { SelectComponent } from '../../../../../common/components/form/select/select.component';

@Component({
  selector: 'app-create-category',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  public refreshCategories = output<void>();
  public closeModal = output<void>();

  public rulesSelect = [
    { value: 'NEED', label: 'Necesidad' },
    { value: 'WANT', label: 'Lujos' },
    { value: 'SAVING', label: 'Ahorros' },
  ];

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    rule: ['', [Validators.required]],
  });

  public createCategory() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.categoryService.create(this.form.value).subscribe({
      next: (response) => {
        console.log('Categoría creada:', response);
        this.form.reset();
        this.refreshCategories.emit();
        this.closeModal.emit();
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
      },
    });
  }
}
