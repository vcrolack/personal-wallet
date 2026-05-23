import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrapperComponent } from '@common/components/ui';

@Component({
  selector: 'app-transactions-visual-resume',
  imports: [WrapperComponent],
  templateUrl: './transactions-visual-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsVisualResume {}
