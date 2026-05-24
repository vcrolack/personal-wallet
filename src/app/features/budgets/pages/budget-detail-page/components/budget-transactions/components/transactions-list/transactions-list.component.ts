import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { ColumnDef, GenericTableComponent } from '@common/components/ui';
import {
  TransactionCategoryAssignmentModel,
  TransactionModel,
} from '@core/models';

@Component({
  selector: 'app-transactions-list',
  imports: [GenericTableComponent],
  templateUrl: './transactions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsList {
  public transactionsData = input.required<TransactionModel[]>();
  public goToPage = input.required<(page: number) => void>();
  public isLoading = input.required<boolean>();
  public pagination = input.required<{
    limit: number;
    page: number;
  }>();

  public transactionCategoryAssignments = computed(() => {
    return this.transactionsData().flatMap(
      (transaction) => transaction.transactionCategoryAssignments || [],
    );
  });

  public columns: ColumnDef<TransactionCategoryAssignmentModel>[] = [
    {
      key: 'category',
      header: 'Categoría',
      accessor: (row) =>
        row.budgetCategoryValue.budgetCategory.name ?? 'Sin categoría',
    },
    {
      key: 'category-value',
      header: 'Valor de categoría',
      accessor: (row) => row.budgetCategoryValue.name ?? 'Sin valor',
    },
    {
      key: 'created-at',
      header: 'Fecha',
      accessor: (row) => row.createdAt,
      pipe: 'date',
    },
    {
      key: 'amount',
      header: 'Monto',
      accessor: (row) => row.amount,
      pipe: 'currency',
    },
  ];
}
