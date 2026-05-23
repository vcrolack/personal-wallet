import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '@common/components/form';
import { TextComponent, ErrorFormMessage } from '@common/components/ui';

@Component({
  selector: 'app-amount-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    TextComponent,
    ErrorFormMessage,
  ],
  templateUrl: './amount-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountInput {
  public form = input.required<FormGroup>();
}
