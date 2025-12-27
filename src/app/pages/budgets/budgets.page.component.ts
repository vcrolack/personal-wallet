import { Component, inject, signal } from '@angular/core';
import { ColumnDef } from '../../common/interfaces/table.interface';
import { GenericTableComponent } from '../../common/components/table/table.component';
import { BudgetService } from '../../core/services/budget.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets.page',
  imports: [GenericTableComponent],
  templateUrl: './budgets.page.component.html',
  styleUrl: './budgets.page.component.css',
})
export class BudgetsPageComponent {
  private budgetService = inject(BudgetService);
  private router = inject(Router);

  public budgetsResource = rxResource({
    request: () => ({ limit: 10, offset: 0 }),
    loader: ({ request }) => {
      return this.budgetService.findAll(request.limit, request.offset);
    },
  });

  budgets = signal<any[]>([
    {
      date: '2025-12-25',
      description: 'Navidad',
      amount: 1000,
    },
    {
      date: '2025-12-26',
      description: 'Navidad',
      amount: 1000,
    },
  ]);
  loading = signal(false);
  columns: ColumnDef<any>[] = [
    { key: 'startDate', header: 'Fecha de inicio' },
    { key: 'endDate', header: 'Fecha de término' },
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
      align: 'left',
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

  openDetail(id: string) {
    this.router.navigate(['/budgets', id]);
  }
}
