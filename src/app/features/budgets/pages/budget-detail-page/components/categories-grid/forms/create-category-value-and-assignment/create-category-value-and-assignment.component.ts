import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { InputComponent } from '../../../../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../../../../common/components/form/button/button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetCategoryValuesService } from '../../../../../../../../core/services/budget-category-values.service';
import { BudgetCategoryAssignmentsService } from '../../../../../../../../core/services/budget-category-assignments.service';
import { BudgetService } from '../../../../../../../../core/services/budget.service';
import { ToastService } from '../../../../../../../../common/components/ui/toast/toast.service';
import {
  AutocompleteComponent,
  AutocompleteOption,
} from '../../../../../../../../common/components/form/autocomplete/autocomplete.component';

@Component({
  selector: 'app-create-category-value-and-assignment',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AutocompleteComponent,
  ],
  templateUrl: './create-category-value-and-assignment.component.html',
  styleUrl: './create-category-value-and-assignment.component.css',
})
export class CreateCategoryValueAndAssignmentComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private budgetService = inject(BudgetService);
  private categoryValueService = inject(BudgetCategoryValuesService);
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);

  public categoryId = input.required<number>();

  constructor() {
    effect(() => {
      const categoryId = this.categoryId();
      if (categoryId) {
        this.categoryValueService.selectCategory(categoryId);
      }
    });
  }
  public budget = this.budgetService.budgetResourceDetail;
  public categoryValuesResource =
    this.categoryValueService.categoryValuesResource;

  public closeModal = output<void>();

  public form = this.fb.group({
    budgetCategoryValue: [null as number | null, [Validators.required]],
    allocatedAmount: ['', [Validators.required, Validators.min(1)]],
  });

  public categoryValuesForAutocomplete = computed((): AutocompleteOption[] => {
    return this.categoryValuesData().map((categoryValue) => ({
      label: categoryValue.name,
      value: categoryValue.id,
    }));
  });

  public categoryValuesData = computed(() => {
    const response = this.categoryValuesResource.value();
    if (!response || Array.isArray(response)) return [];
    return response.data;
  });

  public createCategoryValue(name: string) {
    this.categoryValueService
      .create({
        name,
        budgetCategoryId: this.categoryId(),
      })
      .subscribe({
        next: (categoryValue) => {
          this.toastService.show('Valor de categoría creado', 'success');
          this.categoryValueService.reloadList();
          this.form.patchValue({ budgetCategoryValue: categoryValue.id });
        },
      });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.budget.hasValue()) return;

    this.categoryAssignmentService
      .assignCategory({
        budgetId: this.budget.value()!.id,
        budgetCategoryValueId: this.form.value.budgetCategoryValue!,
        allocatedAmount: +this.form.value.allocatedAmount!,
      })
      .subscribe({
        next: () => {
          this.toastService.show('Categoría agregada correctamente', 'success');
          this.budget.reload();
          this.closeModal.emit();
          this.form.reset();
        },
      });
  }

  public searchCategoryValue(term: string) {
    this.categoryValueService.search(term);
  }
}
