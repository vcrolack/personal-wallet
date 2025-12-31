import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnAlign, ColumnDef } from '../../../interfaces/table.interface';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class GenericTableComponent<T> {
  public data = input<T[]>([]);
  public columns = input<ColumnDef<T>[]>([]);
  public isLoading = input(false);

  public trackBy = input<(index: number, row: T) => any>(
    (i, row) => (row as any)?.id ?? i
  );

  public rowClick = output<T>();

  public colCount = computed(() => this.columns().length);

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
