import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GenericTableComponent } from '../../../../common/components/ui/table/table.component';
import { ColumnDef } from '../../../../common/interfaces/table.interface';
import { BudgetService } from '../../../../core/services/budget.service';
import { ButtonComponent } from '../../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../../common/components/ui/modal/modal.component';
import { CreateOrUpdateBudget } from './forms/create-or-update-budget/create-or-update-budget';
import { Budget } from '../../../../core/interfaces/budget.interface';

@Component({
  selector: 'app-budgets.page',
  imports: [
    GenericTableComponent,
    ButtonComponent,
    ModalComponent,
    CreateOrUpdateBudget,
  ],
  templateUrl: './budgets.page.component.html',
  styleUrl: './budgets.page.component.css',
})
export class BudgetsPageComponent {
  private budgetService = inject(BudgetService);
  private router = inject(Router);

  public isModalOpen = signal<boolean>(false);
  public action = signal<'create' | 'update' | 'delete' | undefined>(undefined);

  public budgetsResource = this.budgetService.budgetResourceList;

  public budgetsData = computed(() => {
    const value = this.budgetsResource.value();
    if (!value || Array.isArray(value)) return [];
    return value.data;
  });

  public budget = signal<Budget | undefined>(undefined);

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
    { key: 'title', header: 'Nombre' },
    {
      key: 'isShared',
      header: 'Acceso',
      formatter: (v) => (v ? 'Compartido' : 'Privado'),
    },
    {
      key: 'endDate',
      header: 'Caducado',
      formatter: (v) => {
        const date = new Date(v as string);
        const today = new Date();
        if (date < today) {
          return 'Sí';
        }
        return 'No';
      },
    },
    {
      key: 'budgetAmount',
      header: 'Dinero destinado',
      align: 'center',
      pipe: 'currency',
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          callback: (row) => {
            console.log(row);
            this.toggleModal('update');
            this.budget.set(row);
          },
          class: 'text-blue-500 hover:bg-blue-50',
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          callback: (row) => {
            this.toggleModal('delete');
            this.budget.set(row);
          },
          class: 'text-red-500 hover:bg-red-50',
        },
      ],
    },
  ];

  public get modalTitle(): string {
    switch (this.action()) {
      case 'create':
        return 'Crear presupuesto';
      case 'update':
        return 'Editar presupuesto';
      case 'delete':
        return 'Eliminar presupuesto';
      default:
        return '';
    }
  }

  public openDetail(id: string) {
    this.router.navigate(['/budgets', id]);
  }

  public onPageChange(page: number) {
    this.budgetService.setPagination(page, 10);
  }

  public toggleModal(action?: 'create' | 'update' | 'delete') {
    this.action.set(action);
    this.isModalOpen.update((prev) => !prev);
  }

  public delete(id: string) {
    this.budgetService.delete(id).subscribe({
      next: () => {
        this.toggleModal();
        this.budgetsResource.reload();
      },
    });
  }
}
