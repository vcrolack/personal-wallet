import { Component, signal } from '@angular/core';
import { ColumnDef } from '../../common/interfaces/table.interface';
import { GenericTableComponent } from '../../common/components/table/table.component';

@Component({
  selector: 'app-budgets.page',
  imports: [GenericTableComponent],
  templateUrl: './budgets.page.component.html',
  styleUrl: './budgets.page.component.css',
})
export class BudgetsPageComponent {
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
    { key: 'date', header: 'Fecha' },
    { key: 'description', header: 'Descripción', widthClass: 'min-w-[240px]' },
    {
      key: 'amount',
      header: 'Monto',
      align: 'right',
      formatter: (v) => `$ ${Number(v).toFixed(2)}`,
    },
  ];

  openDetail(event: Event) {
    console.log(event);
  }
}
