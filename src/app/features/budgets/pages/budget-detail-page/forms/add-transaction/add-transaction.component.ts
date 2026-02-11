import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../../../common/components/form/input/input.component';
import { DateSelectorComponent } from '../../../../../../common/components/form/date-selector/date-selector.component';
import { AutocompleteComponent } from '../../../../../../common/components/form/autocomplete/autocomplete.component';
import { ButtonComponent } from '../../../../../../common/components/form/button/button.component';
import { IconButtonComponent } from '../../../../../../common/components/form/icon-button/icon-button.component';
import { ButtonTextComponent } from '../../../../../../common/components/form/button-text/button-text.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';
import { TextComponent } from '../../../../../../common/components/ui/typography/text/text.component';
import {
  SelectComponent,
  SelectOption,
} from '../../../../../../common/components/form/select/select.component';
import { AddTransactionService } from '../../services/add-transaction.service';

@Component({
  selector: 'app-add-transaction',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DateSelectorComponent,
    AutocompleteComponent,
    ButtonComponent,
    IconButtonComponent,
    ButtonTextComponent,
    WrapperComponent,
    TextComponent,
    SelectComponent,
  ],
  providers: [AddTransactionService],
  templateUrl: './add-transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  private fb = inject(FormBuilder);
  private addTransactionService = inject(AddTransactionService);

  public form = this.fb.group({
    amount: [0, Validators.required],
    transactionDate: [new Date(), Validators.required],
    description: ['', Validators.required],
    bankId: [null, Validators.required],
    transactionTypeId: [null, Validators.required],
    assignments: this.fb.array([]),
  });

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
      categoryValueId: [null, Validators.required],
      amount: [0, Validators.required],
    });

    this.assignments.push(assignmentGroup);
  }

  public removeAssignment(index: number) {
    this.assignments.removeAt(index);
  }
}
