import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
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
  public isLoading = input.required<boolean>();

  public currentPage = signal<number>(1);
  public readonly pageSize = 10;

  constructor() {
    effect(() => {
      this.transactionsData();
      this.currentPage.set(1);
    });
  }

  public transactionCategoryAssignments = computed(() => {
    const allAssignments = this.transactionsData().data.flatMap(
      (transaction) => transaction.transactionCategoryAssignments || [],
    );
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return allAssignments.slice(startIndex, startIndex + this.pageSize);
  });

  public columns: ColumnDef<TransactionCategoryAssignmentModel>[] = [
    {
      key: 'category',
      header: 'Categoría',
      accessor: (row) =>
        row.budgetCategoryValue?.budgetCategory?.name ?? 'Sin categoría',
    },
    {
      key: 'category-value',
      header: 'Valor de categoría',
      accessor: (row) => row.budgetCategoryValue?.name ?? 'Sin valor',
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
    const allAssignments = this.transactionsData().data.flatMap(
      (transaction) => transaction.transactionCategoryAssignments || [],
    );

    return {
      currentPage: this.currentPage(),
      pageSize: this.pageSize,
      totalItems: allAssignments.length,
      totalPages: Math.ceil(allAssignments.length / this.pageSize),
    };
  });

  public onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
