import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@common/components/form/input/input.component';
import { TextComponent } from '@common/components/ui/typography/text/text.component';
import { ErrorFormMessage } from '@common/components/ui/error-form-message/error-form-message.component';

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
