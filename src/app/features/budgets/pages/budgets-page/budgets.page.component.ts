import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GenericTableComponent } from '../../../../common/components/ui/table/table.component';
import { ColumnDef } from '../../../../common/interfaces/table.interface';
import { BudgetService } from '../../../../core/services/budget.service';

@Component({
  selector: 'app-budgets.page',
  imports: [GenericTableComponent],
  templateUrl: './budgets.page.component.html',
  styleUrl: './budgets.page.component.css',
})
export class BudgetsPageComponent {
  private budgetService = inject(BudgetService);
  private router = inject(Router);

  public budgetsResource = this.budgetService.budgetResourceList;

  public budgetsData = computed(() => {
    const value = this.budgetsResource.value();
    if (!value || Array.isArray(value)) return [];
    return value.data;
  });

  public pagination = computed(() => {
    const value = this.budgetsResource.value();
    if (!value || Array.isArray(value) || !value.meta) {
      return { currentPage: 1, pageSize: 10, totalItems: 0, totalPages: 0 };
    }

    const { currentPage, itemsPerPage, totalItems, totalPages } = value.meta;

    return {
      currentPage,
      pageSize: itemsPerPage,
      totalItems,
      totalPages,
    };
  });

  public loading = signal(false);
  public columns: ColumnDef<any>[] = [
    { key: 'startDate', header: 'Fecha de inicio', pipe: 'date' },
    { key: 'endDate', header: 'Fecha de término', pipe: 'date' },
    { key: 'description', header: 'Descripción' },
    {
      key: 'budgetAmount',
      header: 'Dinero destinado',
      align: 'center',
      formatter: (v) => `$ ${Number(v).toFixed(2)}`,
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          callback: (row) => console.log('Editar', row),
          class: 'text-blue-500 hover:bg-blue-50',
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          callback: (row) => console.log('Eliminar', row),
          class: 'text-red-500 hover:bg-red-50',
        },
      ],
    },
  ];

  public openDetail(id: string) {
    this.router.navigate(['/budgets', id]);
  }

  public onPageChange(page: number) {
    this.budgetService.setPagination(page, 10);
  }
}
