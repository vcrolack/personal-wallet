import { Component, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../../common/components/input/input.component';
import { ButtonComponent } from '../../../../../common/components/button/button.component';
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  public refreshCategories = output<void>();
  public closeModal = output<void>();

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
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
