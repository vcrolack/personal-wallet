import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { SelectComponent } from '../../../../../../common/components/form/select/select.component';

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
  templateUrl: './add-transaction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    amount: [0, Validators.required],
    transactionDate: [new Date(), Validators.required],
    description: ['', Validators.required],
    assignments: this.fb.array([]),
  });

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
