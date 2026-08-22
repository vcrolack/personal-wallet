import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
} from 'lucide-angular';

import {
  ColumnAlign,
  ColumnDef,
  SortDirection,
  SortState,
  TablePagination,
} from '@common/components/ui';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class GenericTableComponent<T> {
  public data = input<T[]>([]);
  public columns = input<ColumnDef<T>[]>([]);
  public isLoading = input(false);
  public error = input<any>(null);
  public pagination = input<TablePagination | null>(null);

  // Sorting & Searching inputs/models
  public serverSide = input(false);
  public searchable = input(false);
  public searchPlaceholder = input('Buscar...');
  public searchValue = model('');
  public sort = model<SortState | null>(null);

  // Outputs
  public rowClick = output<T>();
  public pageChange = output<number>();
  public searchChange = output<string>();

  // Lucide Icons
  public readonly ChevronLeft = ChevronLeft;
  public readonly ChevronRight = ChevronRight;
  public readonly ChevronUp = ChevronUp;
  public readonly ChevronDown = ChevronDown;
  public readonly ChevronsUpDown = ChevronsUpDown;
  public readonly Search = Search;
  public readonly X = X;

  public trackBy = input<(index: number, row: T) => any>(
    (i, row) => (row as any)?.id ?? i,
  );

  public colCount = computed(() => this.columns().length);

  public canGoPrevious = computed(() => {
    const pag = this.pagination();
    return pag ? pag.currentPage > 1 : false;
  });

  public canGoNext = computed(() => {
    const pag = this.pagination();
    return pag ? pag.currentPage < pag.totalPages : false;
  });

  public showingFrom = computed(() => {
    const pag = this.pagination();
    if (!pag || this.processedData().length === 0) return 0;
    return (pag.currentPage - 1) * pag.pageSize + 1;
  });

  public showingTo = computed(() => {
    const pag = this.pagination();
    if (!pag || this.processedData().length === 0) return 0;
    const from = (pag.currentPage - 1) * pag.pageSize + 1;
    return from + this.processedData().length - 1;
  });

  public processedData = computed(() => {
    const rawData = this.data();
    if (this.serverSide() || !rawData.length) {
      return rawData;
    }

    let result = [...rawData];

    // Filter client-side
    const query = this.searchValue().trim().toLowerCase();
    if (query) {
      const cols = this.columns();
      result = result.filter((row) =>
        cols.some((col) => {
          const val = this.getCellValue(row, col);
          return val != null && String(val).toLowerCase().includes(query);
        }),
      );
    }

    // Sort client-side
    const sortState = this.sort();
    if (sortState && sortState.direction) {
      const col = this.columns().find(
        (c) => (c.sortKey || (c.key as string)) === sortState.active,
      );

      if (col) {
        const dir = sortState.direction;
        const multiplier = dir === 'asc' ? 1 : -1;

        result.sort((a, b) => {
          if (col.sortFn) {
            return col.sortFn(a, b, dir);
          }

          const valA = col.accessor
            ? col.accessor(a)
            : (a as any)[col.key as any];
          const valB = col.accessor
            ? col.accessor(b)
            : (b as any)[col.key as any];

          if (valA == null && valB == null) return 0;
          if (valA == null) return 1;
          if (valB == null) return -1;

          if (typeof valA === 'number' && typeof valB === 'number') {
            return (valA - valB) * multiplier;
          }

          if (valA instanceof Date && valB instanceof Date) {
            return (valA.getTime() - valB.getTime()) * multiplier;
          }

          return (
            String(valA).localeCompare(String(valB), undefined, {
              numeric: true,
              sensitivity: 'base',
            }) * multiplier
          );
        });
      }
    }

    return result;
  });

  public toggleSort(col: ColumnDef<T>) {
    if (!col.sortable) return;

    const key = col.sortKey || (col.key as string);
    const current = this.sort();

    let nextDirection: SortDirection = 'asc';
    if (current && current.active === key) {
      if (current.direction === 'asc') nextDirection = 'desc';
      else if (current.direction === 'desc') nextDirection = null;
      else nextDirection = 'asc';
    }

    const nextState: SortState | null = nextDirection
      ? { active: key, direction: nextDirection }
      : null;

    this.sort.set(nextState);
  }

  public getSortDirection(col: ColumnDef<T>): SortDirection {
    const key = col.sortKey || (col.key as string);
    const current = this.sort();
    if (current && current.active === key) {
      return current.direction;
    }
    return null;
  }

  public onSearchInput(value: string) {
    this.searchValue.set(value);
    this.searchChange.emit(value);
  }

  public clearSearch() {
    this.searchValue.set('');
    this.searchChange.emit('');
  }

  public getAlignClass(align?: ColumnAlign) {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  }

  public getHeaderFlexAlignClass(align?: ColumnAlign) {
    if (align === 'center') return 'justify-center';
    if (align === 'right') return 'justify-end';
    return 'justify-start';
  }

  public getCellValue(row: T, col: ColumnDef<T>) {
    const raw = col.accessor ? col.accessor(row) : (row as any)[col.key as any];
    const safe = raw ?? '';
    return col.formatter ? col.formatter(safe, row) : String(safe);
  }
}
