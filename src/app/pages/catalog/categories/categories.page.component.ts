import { Component, computed, effect, inject, signal } from '@angular/core';
import { TabsComponent } from '../../../common/components/tabs/tabs.component';
import { TabItem } from '../../../common/interfaces/tab-item.interface';
import { HeaderComponent } from '../../../common/components/header/header.component';
import { CategoryService } from '../../../core/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BudgetCategoryValuesService } from '../../../core/services/budget-category-values.service';
import { ColumnDef } from '../../../common/interfaces/table.interface';
import { GenericTableComponent } from '../../../common/components/table/table.component';
import { ButtonComponent } from '../../../common/components/button/button.component';
import { ModalComponent } from '../../../common/components/modal/modal.component';
import { CreateCategoryComponent } from './forms/create-category/create-category.component';
import { CreateCategoryValueComponent } from './forms/create-category-value/create-category-value.component';

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
  public modalType = signal<'category' | 'category-value' | undefined>(
    undefined
  );
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

  constructor() {
    effect(() => {
      const currentTabs = this.tabs();
      if (currentTabs.length > 0 && this.activeTabId() === undefined) {
        this.activeTabId.set(currentTabs[0].id);
      }
    });
  }

  public get modalTitle(): string {
    return this.modalType() === 'category'
      ? 'Crear categoría'
      : 'Crear valor de categoría';
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

  public toggleModal(type: 'category' | 'category-value' | undefined) {
    this.modalType.set(type);
    this.isModalOpen.update((value) => !value);
  }
}
