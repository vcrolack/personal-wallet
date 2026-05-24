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
import { Metadata } from '@core/dtos';
import { HeaderComponent } from '@common/components/layout';

@Component({
  selector: 'app-transactions-list',
  imports: [GenericTableComponent, HeaderComponent],
  templateUrl: './transactions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsList {
  public transactionsData = input.required<{
    data: TransactionModel[];
    meta?: Metadata;
  }>();
  public goToPage = input.required<(page: number) => void>();
  public isLoading = input.required<boolean>();
  public pagination = input.required<{
    limit: number;
    page: number;
  }>();

  public transactionCategoryAssignments = computed(() => {
    return this.transactionsData().data.flatMap(
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

  public transactionCategoryAssignmentsPagination = computed(() => {
    const meta = this.transactionsData().meta;
    if (!meta) {
      return { currentPage: 1, pageSize: 10, totalItems: 0, totalPages: 0 };
    }
    return {
      currentPage: meta.currentPage,
      pageSize: meta.itemsPerPage,
      totalItems: meta.totalItems,
      totalPages: meta.totalPages,
    };
  });
}
