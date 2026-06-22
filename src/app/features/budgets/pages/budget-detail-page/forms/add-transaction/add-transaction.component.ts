import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
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
import { Assignments, CreateTransactionRequest } from '@core/requests';
import { DateValidator, NotificationService } from '@core/errors';
import { BudgetModel, TransactionModel } from '@core/models';

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
export class AddTransactionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private addTransactionService = inject(AddTransactionService);
  private notificationService = inject(NotificationService);

  public closeModal = output<void>();
  public budget = input.required<BudgetModel>();
  public transactionToEdit = input<TransactionModel | null>(null);

  public form!: FormGroup;

  public ngOnInit() {
    const editTx = this.transactionToEdit();

    this.form = this.fb.group({
      amount: [
        { value: editTx ? editTx.amount : 0, disabled: true },
        [Validators.required, Validators.min(1)],
      ],
      transactionDate: [
        editTx ? new Date(editTx.transactionDate) : new Date(),
        [
          Validators.required,
          DateValidator.maxDate(() => this.budget()?.endDate),
          DateValidator.minDate(() => this.budget()?.startDate),
        ],
      ],
      description: [
        editTx ? editTx.description : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(55),
        ],
      ],
      bankId: [editTx ? editTx.bankId : null, Validators.required],
      transactionTypeId: [editTx ? editTx.transactionTypeId : null, Validators.required],
      assignments: this.fb.array<Assignments>([], [Validators.required]),
    });

    if (editTx && editTx.transactionCategoryAssignments) {
      for (const assignment of editTx.transactionCategoryAssignments) {
        const categoryId = assignment.budgetCategoryValue?.budgetCategory?.id;
        const categoryValueId = assignment.budgetCategoryValue?.id;
        
        const assignmentGroup = this.fb.group({
          categoryId: [categoryId, Validators.required],
          categoryValueId: [categoryValueId, Validators.required],
          amount: [assignment.amount, [Validators.required, Validators.min(1)]],
        });
        this.assignments.push(assignmentGroup);
      }
    }

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
      categoryId: [null, Validators.required],
      categoryValueId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
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
    const editTx = this.transactionToEdit();

    const requestBody: CreateTransactionRequest = {
      amount: formValue.amount!,
      transactionDate: new Date(formValue.transactionDate!).toISOString(),
      description: formValue.description!,
      bankId: formValue.bankId!,
      transactionTypeId: formValue.transactionTypeId!,
      budgetId: this.budget().id,
      assignments: (formValue.assignments || []).map((a: any) => ({
        categoryValueId: +a!.categoryValueId,
        amount: +a!.amount,
      })),
    };

    if (editTx) {
      this.addTransactionService
        .updateTransaction(editTx.id, requestBody)
        .subscribe(() => {
          this.notificationService.showNotification(
            'Transacción actualizada',
            'success',
          );
          this.closeModal.emit();
          this.form.reset();
          this.addTransactionService.reloadTransactionsList();
        });
    } else {
      this.addTransactionService
        .createTransaction(requestBody)
        .subscribe(() => {
          this.notificationService.showNotification(
            'Transacción creada',
            'success',
          );
          this.closeModal.emit();
          this.form.reset();
          this.addTransactionService.reloadTransactionsList();
        });
    }
  }
}
