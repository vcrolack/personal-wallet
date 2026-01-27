import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { DateSelectorComponent } from '../../../../../../common/components/form/date-selector/date-selector.component';
import { InputComponent } from '../../../../../../common/components/form/input/input.component';
import { TextAreaComponent } from '../../../../../../common/components/form/text-area/text-area.component';
import { CheckboxComponent } from '../../../../../../common/components/form/checkbox/checkbox.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import { BudgetService } from '../../../../../../core/services/budget.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateBudgetRequest } from '../../../../../../core/requests/budgets/create-budget.request';
import { Budget } from '../../../../../../core/interfaces/budget.interface';
import { UpdateBudgetRequest } from '../../../../../../core/requests/budgets/update-budget.request';
import { ToastService } from '../../../../../../common/components/ui/toast/toast.service';

@Component({
  selector: 'app-create-or-update-budget',
  imports: [
    DateSelectorComponent,
    InputComponent,
    TextAreaComponent,
    CheckboxComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-or-update-budget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrUpdateBudget {
  private budgetService = inject(BudgetService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  public canCreate = input.required<boolean>();
  public budget = input<Budget>();
  public closeModal = output<void>();
  public refresh = output<void>();

  public form: FormGroup = this.fb.group({
    title: [null, Validators.required],
    budgetAmount: [null, [Validators.required, Validators.min(1)]],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    description: [null, Validators.required],
    isShared: [false],
  });

  public ngOnInit() {
    const budget = this.budget();
    if (budget) {
      this.form.patchValue({
        ...budget,
        startDate: this.formatDate(budget.startDate),
        endDate: this.formatDate(budget.endDate),
      });
    }
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.canCreate()) {
      this.create(this.form.value);
    } else {
      this.update(this.budget()?.id!, this.form.value);
    }
  }

  public get isCreation(): string {
    return this.canCreate() ? 'Crear' : 'Actualizar';
  }

  private create(body: CreateBudgetRequest) {
    this.budgetService.create(body).subscribe({
      next: () => {
        this.toastService.show('Presupuesto creado correctamente', 'success');
        this.form.reset();
        this.refresh.emit();
        this.closeModal.emit();
      },
    });
  }

  private update(id: string, body: UpdateBudgetRequest) {
    this.budgetService.update(id, body).subscribe({
      next: () => {
        this.toastService.show(
          'Presupuesto actualizado correctamente',
          'success',
        );
        this.form.reset();
        this.refresh.emit();
        this.closeModal.emit();
      },
    });
  }
}
