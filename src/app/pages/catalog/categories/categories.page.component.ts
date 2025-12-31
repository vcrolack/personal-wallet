import { Component, computed, effect, inject, signal } from '@angular/core';
import { TabItem } from '../../../common/interfaces/tab-item.interface';
import { HeaderComponent } from '../../../common/components/layout/header/header.component';
import { CategoryService } from '../../../core/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BudgetCategoryValuesService } from '../../../core/services/budget-category-values.service';
import { ColumnDef } from '../../../common/interfaces/table.interface';
import { ButtonComponent } from '../../../common/components/form/button/button.component';
import { ModalComponent } from '../../../common/components/ui/modal/modal.component';
import { CreateCategoryComponent } from './forms/create-category/create-category.component';
import { CreateCategoryValueComponent } from './forms/create-category-value/create-category-value.component';
import { EditCategoryValueComponent } from './forms/edit-category-value/edit-category-value.component';
import { BudgetCategoryValue } from '../../../core/interfaces/budget-category-value.interface';
import { GenericTableComponent } from '../../../common/components/ui/table/table.component';
import { TabsComponent } from '../../../common/components/layout/tabs/tabs.component';

@Component({
  selector: 'app-categories.page',
  imports: [
    TabsComponent,
    HeaderComponent,
    GenericTableComponent,
    ButtonComponent,
    ModalComponent,
    CreateCategoryComponent,
    CreateCategoryValueComponent,
    EditCategoryValueComponent,
  ],
  templateUrl: './categories.page.component.html',
  styleUrl: './categories.page.component.css',
})
export class CategoriesPageComponent {
  private categoryService = inject(CategoryService);
  private categoryValuesService = inject(BudgetCategoryValuesService);

  public activeTabId = signal<string | number | undefined>(undefined);
  public isLoading = signal<boolean>(false);
  public isModalOpen = signal<boolean>(false);
  public categoryToEdit = signal<BudgetCategoryValue | undefined>(undefined);
  public modalType = signal<
    | 'category'
    | 'category-value'
    | 'delete-category-value'
    | 'edit-category-value'
    | undefined
  >(undefined);
  private readonly MODAL_TITLES: Record<string, string> = {
    category: 'Crear categoría',
    'category-value': 'Crear valor de categoría',
    'edit-category-value': 'Editar valor de categoría',
    'delete-category-value': 'Eliminar valor de categoría',
  };
  public columns: ColumnDef<any>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    {
      key: 'createdAt',
      header: 'Creación',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
    },
    {
      key: 'actions',
      header: 'Acciones',
      actions: [
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          callback: (row) => {
            this.toggleModal('edit-category-value');
            this.categoryToEdit.set(row);
          },
          class: 'text-blue-500 hover:bg-blue-50',
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          callback: (row) => {
            console.log('Eliminar', row);
            this.toggleModal('delete-category-value');
            this.categoryToEdit.set(row);
          },
          class: 'text-red-500 hover:bg-red-50',
        },
      ],
    },
  ];

  constructor() {
    effect(() => {
      const currentTabs = this.tabs();
      if (currentTabs.length > 0 && this.activeTabId() === undefined) {
        this.activeTabId.set(currentTabs[0].id);
      }
    });
  }

  public get modalTitle(): string {
    return this.MODAL_TITLES[this.modalType() ?? ''] ?? '';
  }

  public categoryResource = rxResource({
    request: () => ({ limit: 10, offset: 0 }),
    loader: ({ request }) => {
      return this.categoryService.findAll(request.limit, request.offset);
    },
  });

  public categoryValuesResource = rxResource({
    request: () => ({
      limit: 10,
      offset: 0,
      budgetCategoryId: this.activeTabId(),
    }),
    loader: ({ request }) => {
      return this.categoryValuesService.findAll(
        request.limit,
        request.offset,
        request.budgetCategoryId as number
      );
    },
  });

  public tabs = computed<TabItem[]>(() => {
    const response = this.categoryResource.value();
    if (!response?.data) return [];

    return response.data.map((category) => ({
      label: category.name,
      id: category.id,
    }));
  });

  public toggleModal(
    type:
      | 'category'
      | 'category-value'
      | 'delete-category-value'
      | 'edit-category-value'
      | undefined
  ) {
    this.modalType.set(type);
    this.isModalOpen.update((value) => !value);
  }

  public deleteCategoryValue() {
    const categoryValue = this.categoryToEdit();
    if (!categoryValue) return;

    this.categoryValuesService.delete(categoryValue.id).subscribe({
      next: () => {
        this.categoryValuesResource.reload();
        this.toggleModal(undefined);
      },
      error: (error) => {
        console.error('Error deleting category value:', error);
      },
    });
  }
}
