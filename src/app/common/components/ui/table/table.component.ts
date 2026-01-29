import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColumnAlign,
  ColumnDef,
  TablePagination,
} from '../../../interfaces/table.interface';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

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

  public readonly ChevronLeft = ChevronLeft;
  public readonly ChevronRight = ChevronRight;

  public trackBy = input<(index: number, row: T) => any>(
    (i, row) => (row as any)?.id ?? i,
  );

  public rowClick = output<T>();
  public pageChange = output<number>();

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
    if (!pag || this.data().length === 0) return 0;
    return (pag.currentPage - 1) * pag.pageSize + 1;
  });

  public showingTo = computed(() => {
    const pag = this.pagination();
    if (!pag || this.data().length === 0) return 0;
    const from = (pag.currentPage - 1) * pag.pageSize + 1;
    return from + this.data().length - 1;
  });

  public getAlignClass(align?: ColumnAlign) {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  }

  public getCellValue(row: T, col: ColumnDef<T>) {
    const raw = col.accessor ? col.accessor(row) : (row as any)[col.key as any];
    const safe = raw ?? '';
    return col.formatter ? col.formatter(safe, row) : String(safe);
  }
}
