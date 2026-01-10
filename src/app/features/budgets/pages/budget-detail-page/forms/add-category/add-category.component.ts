import {
  Component,
  computed,
  inject,
  effect,
  output,
  OnDestroy,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../../../../core/services/category.service';
import { BudgetCategoryValuesService } from '../../../../../../core/services/budget-category-values.service';
import {
  SelectOption,
  SelectComponent,
} from '../../../../../../common/components/form/select/select.component';
import { BudgetGroupModel } from '../../../../../../core/models/budgets/budget-group.model';
import { InputComponent } from '../../../../../../common/components/form/input/input.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetCategoryAssignmentsService } from '../../../../../../core/services/budget-category-assignments.service';
import { CreateBudgetCategoryAssignmentRequest } from '../../../../../../core/requests/budget-category-assignments/create-budget-category-assignment.request';
import { BudgetService } from '../../../../../../core/services/budget.service';
import { catchError, finalize, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
export class AddCategoryComponent implements OnDestroy {
  private categoryService = inject(CategoryService);
  private categoryValueService = inject(BudgetCategoryValuesService);
  private categoryAssignmentService = inject(BudgetCategoryAssignmentsService);
  private budgetService = inject(BudgetService);
  private fb = inject(FormBuilder);

  public closeModal = output<void>();

  public isLoadingCreatingAssignment = signal<boolean>(false);

  public categoryResource = this.categoryService.categoryResource;
  public categoryValuesResource =
    this.categoryValueService.categoryValuesResource;
  public budgetDetailResource = this.budgetService.budgetResourceDetail;

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

  public categoriesForSelect = computed((): SelectOption[] => {
    const allCategories = this.categoryResource.value() ?? [];
    const assignedCategoryIds =
      this.budgetDetailResource
        .value()
        ?.groups.map((g: BudgetGroupModel) => g.id) ?? [];

    return allCategories
      .filter((category) => !assignedCategoryIds.includes(category.id))
      .map((category) => ({
        label: category.name,
        value: category.id,
      }));
  });

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

  ngOnDestroy(): void {
    this.categoryValueService.selectCategory(undefined as any);
    this.form.reset();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.budgetDetailResource.hasValue()) return;

    const body: CreateBudgetCategoryAssignmentRequest = {
      budgetId: this.budgetDetailResource.value()!.id,
      budgetCategoryValueId: this.categoryValueId(),
      allocatedAmount: this.form.value.amount!,
    };

    this.createCategoryAssignment(body);
  }

  public createCategoryAssignment(body: CreateBudgetCategoryAssignmentRequest) {
    this.isLoadingCreatingAssignment.set(true);
    this.categoryAssignmentService
      .assignCategory({
        budgetId: body.budgetId,
        budgetCategoryValueId: body.budgetCategoryValueId,
        allocatedAmount: +body.allocatedAmount,
      })
      .pipe(
        finalize(() => this.isLoadingCreatingAssignment.set(false)),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(() => new Error(error.error?.message));
        })
      )
      .subscribe({
        next: () => {
          this.form.reset();
          this.budgetDetailResource.reload();
          this.closeModal.emit();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
