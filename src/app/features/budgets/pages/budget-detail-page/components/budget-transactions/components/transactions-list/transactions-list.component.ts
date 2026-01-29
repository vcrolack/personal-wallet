import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericTableComponent } from '../../../../../../../../common/components/ui/table/table.component';

@Component({
  selector: 'app-transactions-list',
  imports: [GenericTableComponent],
  templateUrl: './transactions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsList {}
