import {
  ChangeDetectionStrategy,
  Component,
  inject,
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

@Component({
  selector: 'app-create-budget',
  imports: [
    DateSelectorComponent,
    InputComponent,
    TextAreaComponent,
    CheckboxComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-budget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBudget {
  private budgetService = inject(BudgetService);
  private fb = inject(FormBuilder);

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

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.create(this.form.value);
  }

  private create(body: CreateBudgetRequest) {
    this.budgetService.create(body).subscribe({
      next: () => {
        this.form.reset();
        this.refresh.emit();
        this.closeModal.emit();
      },
    });
  }
}
