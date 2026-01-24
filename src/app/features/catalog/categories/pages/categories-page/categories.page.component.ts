import { Component, inject, signal, effect, computed } from '@angular/core';
import { ButtonComponent } from '../../../../../common/components/form/button/button.component';
import { HeaderComponent } from '../../../../../common/components/layout/header/header.component';
import { TabsComponent } from '../../../../../common/components/layout/tabs/tabs.component';
import { ModalComponent } from '../../../../../common/components/ui/modal/modal.component';
import { GenericTableComponent } from '../../../../../common/components/ui/table/table.component';
import { TabItem } from '../../../../../common/interfaces/tab-item.interface';
import { ColumnDef } from '../../../../../common/interfaces/table.interface';
import { CategoryValueModel } from '../../../../../core/models/categories/category-value.model';
import { BudgetCategoryValuesService } from '../../../../../core/services/budget-category-values.service';
import { CategoryService } from '../../../../../core/services/category.service';
import { CreateCategoryValueComponent } from '../../forms/create-category-value/create-category-value.component';
import { CreateCategoryComponent } from '../../forms/create-category/create-category.component';
import { EditCategoryValueComponent } from '../../forms/edit-category-value/edit-category-value.component';
import { EditCategory } from '../../forms/edit-category/edit-category';
import { CategoryModel } from '../../../../../core/models/categories/category.model';

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
    EditCategory,
  ],
  templateUrl: './categories.page.component.html',
  styleUrl: './categories.page.component.css',
})
export class CategoriesPageComponent {
  public categoryService = inject(CategoryService);
  private categoryValuesService = inject(BudgetCategoryValuesService);

  public activeTabId = signal<string | number | undefined>(undefined);
  public isLoading = signal<boolean>(false);
  public isModalOpen = signal<boolean>(false);
  public categoryToEdit = signal<
    CategoryValueModel | CategoryModel | undefined
  >(undefined);
  public modalType = signal<
    | 'category'
    | 'edit-category'
    | 'delete-category'
    | 'category-value'
    | 'delete-category-value'
    | 'edit-category-value'
    | undefined
  >(undefined);
  private readonly MODAL_TITLES: Record<string, string> = {
    category: 'Crear categoría',
    'edit-category': 'Editar categoría',
    'delete-category': 'Eliminar categoría',
    'category-value': 'Crear valor de categoría',
    'edit-category-value': 'Editar valor de categoría',
    'delete-category-value': 'Eliminar valor de categoría',
  };

  public categoryToEditNarrowed = computed(() => {
    const item = this.categoryToEdit();
    if (!item) return undefined;
    return 'rule' in item ? (item as CategoryModel) : undefined;
  });

  public categoryValueToEditNarrowed = computed(() => {
    const item = this.categoryToEdit();
    if (!item) return undefined;
    return 'categoryId' in item ? (item as CategoryValueModel) : undefined;
  });

  public categoriesPagination = computed(() => {
    const data = this.categoryResource.value() ?? [];
    const params = this.categoryService.paginationParams();
    const currentPage = Math.floor(params.page / params.limit) + 1;

    // NOTE: In a real app, Z (totalItems) should come from the backend.
    // For now, we simulate pagination total items.
    const hasMore = data.length === params.limit;
    const totalItems = hasMore
      ? params.page + data.length + params.limit
      : params.page + data.length;

    return {
      currentPage,
      pageSize: params.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / params.limit),
    };
  });

  public categoryValuesPagination = computed(() => {
    const data = this.categoryValuesResource.value() ?? [];
    const params = this.categoryValuesService.paginationParams();
    const currentPage = Math.floor(params.page / params.limit) + 1;

    // Simulate total items for category values
    const hasMore = data.length === params.limit;
    const totalItems = hasMore
      ? params.page + data.length + params.limit
      : params.page + data.length;

    return {
      currentPage,
      pageSize: params.limit,
      totalItems,
      totalPages: Math.ceil(totalItems / params.limit),
    };
  });

  public onCategoryPageChange(page: number) {
    this.categoryService.setPagination(page, 10);
  }

  public onCategoryValuePageChange(page: number) {
    this.categoryValuesService.setPagination(page, 10);
  }

  public columnsCategoryValues: ColumnDef<any>[] = [
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

  public columnsCategories: ColumnDef<any>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    {
      key: 'createdAt',
      header: 'Creación',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
    },
    {
      key: 'rule',
      header: 'Regla',
    },
    {
      key: 'actions',
      header: 'Acciones',
      actions: [
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          callback: (row) => {
            this.toggleModal('edit-category');
            this.categoryToEdit.set(row);
          },
          class: 'text-blue-500 hover:bg-blue-50',
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          callback: (row) => {
            console.log('Eliminar', row);
            this.toggleModal('delete-category');
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

    effect(() => {
      const id = this.activeTabId();
      if (id !== undefined) {
        this.categoryValuesService.selectCategory(id as number);
      }
    });
  }

  public get modalTitle(): string {
    return this.MODAL_TITLES[this.modalType() ?? ''] ?? '';
  }

  public categoryResource = this.categoryService.categoryResource;

  public categoryValuesResource =
    this.categoryValuesService.categoryValuesResource;

  public tabs = computed<TabItem[]>(() => {
    const response = this.categoryResource.value();
    if (!response) return [];

    return response.map((category) => ({
      label: category.name,
      id: category.id,
    }));
  });

  public toggleModal(
    type:
      | 'category'
      | 'edit-category'
      | 'delete-category'
      | 'category-value'
      | 'delete-category-value'
      | 'edit-category-value'
      | undefined,
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

  public deleteCategory() {
    const category = this.categoryToEdit();
    if (!category) return;

    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.categoryResource.reload();
        this.toggleModal(undefined);
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }
}
