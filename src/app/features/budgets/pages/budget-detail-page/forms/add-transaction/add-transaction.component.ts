import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  InputComponent,
  DateSelectorComponent,
  ButtonComponent,
  ButtonTextComponent,
  SelectComponent,
  SelectOption,
} from '@common/components/form';

import {
  WrapperComponent,
  TextComponent,
  ErrorFormMessage,
} from '@common/components/ui';
import { AddTransactionService } from '@features/budgets/pages/budget-detail-page/services/add-transaction.service';
import { TransactionAssignmentComponent } from '@features/budgets/pages/budget-detail-page/forms/add-transaction/components/transaction-assignment/transaction-assignment.component';
import {
  Assignments,
  CreateTransactionRequest,
} from '@core/requests/transaction/create-transaction.request';
import { NotificationService } from '@core/errors/notification.service';

@Component({
  selector: 'app-add-transaction',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DateSelectorComponent,
    ButtonComponent,
    ButtonTextComponent,
    WrapperComponent,
    TextComponent,
    SelectComponent,
    TransactionAssignmentComponent,
    ErrorFormMessage,
  ],
  providers: [AddTransactionService],
  templateUrl: './add-transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  private fb = inject(FormBuilder);
  private addTransactionService = inject(AddTransactionService);
  private notificationService = inject(NotificationService);

  public closeModal = output<void>();
  public budgetId = input.required<string>();

  public form = this.fb.group({
    amount: [
      { value: 0, disabled: true },
      [Validators.required, Validators.min(1)],
    ],
    transactionDate: [new Date(), Validators.required],
    description: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(55)],
    ],
    bankId: [null, Validators.required],
    transactionTypeId: [null, Validators.required],
    assignments: this.fb.array<Assignments>([]),
  });

  constructor() {
    this.assignments.valueChanges.subscribe((assignments) => {
      const total = assignments.reduce(
        (acc: number, curr: Partial<Assignments>) => acc + (curr?.amount || 0),
        0,
      );
      this.form.patchValue({ amount: total }, { emitEvent: false });
    });
  }

  public banksOptions = computed<SelectOption[]>(() =>
    this.addTransactionService.banks().map((bank) => ({
      label: bank.name,
      value: bank.id,
    })),
  );

  public transactionTypesOptions = computed<SelectOption[]>(() =>
    this.addTransactionService.transactionTypes().map((transactionType) => ({
      label: transactionType.name,
      value: transactionType.id,
    })),
  );

  public get assignments() {
    return this.form.get('assignments') as FormArray;
  }

  public addAssignment() {
    const assignmentGroup = this.fb.group({
      categoryId: [null],
      categoryValueId: [null, Validators.required],
      amount: [0, Validators.required],
    });

    this.assignments.push(assignmentGroup);
  }

  public removeAssignment(index: number) {
    this.assignments.removeAt(index);
  }

  public asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const createTransactionRequest: CreateTransactionRequest = {
      amount: formValue.amount!,
      transactionDate: new Date(formValue.transactionDate!).toISOString(),
      description: formValue.description!,
      bankId: formValue.bankId!,
      transactionTypeId: formValue.transactionTypeId!,
      budgetId: this.budgetId(),
      assignments: (formValue.assignments || []).map((a) => ({
        categoryValueId: +a!.categoryValueId,
        amount: +a!.amount,
      })),
    };

    this.addTransactionService
      .createTransaction(createTransactionRequest)
      .subscribe(() => {
        this.notificationService.showNotification(
          'Transacción creada',
          'success',
        );
        this.closeModal.emit();
        this.form.reset();
      });
  }
}
