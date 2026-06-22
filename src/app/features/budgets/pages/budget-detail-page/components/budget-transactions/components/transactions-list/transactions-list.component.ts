import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { BudgetService, TransactionsService } from '@core/services';
import { NotificationService } from '@core/errors';

import {
  ColumnDef,
  GenericTableComponent,
  ModalComponent,
} from '@common/components/ui';
import {
  TransactionCategoryAssignmentModel,
  TransactionModel,
} from '@core/models';
import { Metadata } from '@core/dtos';
import { HeaderComponent } from '@common/components/layout';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonComponent } from '@common/components/form';
import { AddTransactionComponent } from '@features/budgets/pages/budget-detail-page/forms/add-transaction/add-transaction.component';
import { BudgetTransactionsViewService } from '../../../../services/budget-transactions-view.service';

@Component({
  selector: 'app-transactions-list',
  imports: [
    GenericTableComponent,
    HeaderComponent,
    ModalComponent,
    CurrencyPipe,
    DatePipe,
    ButtonComponent,
    AddTransactionComponent,
  ],
  templateUrl: './transactions-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsList {
  private budgetService = inject(BudgetService);
  private transactionsService = inject(TransactionsService);
  private notificationService = inject(NotificationService);
  private viewService = inject(BudgetTransactionsViewService);

  public budget = this.budgetService.budgetResourceDetail.value;

  public transactionsData = input.required<{
    data: TransactionModel[];
    meta?: Metadata;
  }>();
  public isLoading = input.required<boolean>();

  public currentPage = signal<number>(1);
  public readonly pageSize = 10;

  public isDetailModalOpen = signal<boolean>(false);
  public selectedTransaction = signal<TransactionModel | null>(null);
  public isEditMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.transactionsData();
      this.currentPage.set(1);
    });
  }

  public transactionCategoryAssignments = computed(() => {
    const allAssignments = this.transactionsData().data.flatMap((transaction) =>
      (transaction.transactionCategoryAssignments || []).map((assignment) => ({
        ...assignment,
        transaction,
      })),
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

  public onRowClick(row: any) {
    this.selectedTransaction.set(row.transaction);
    this.isDetailModalOpen.set(true);
    this.isEditMode.set(false);
  }

  public deleteTransaction(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
      this.transactionsService.delete(id).subscribe(() => {
        this.notificationService.showNotification(
          'Transacción eliminada',
          'success',
        );
        this.isDetailModalOpen.set(false);
        this.viewService.reloadList(); // Recarga la tabla y gráficos de resumen
      });
    }
  }
}
