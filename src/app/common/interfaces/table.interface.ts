export type ColumnAlign = 'left' | 'center' | 'right';

export type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  align?: ColumnAlign;

  accessor?: (row: T) => unknown;
  formatter?: (value: unknown, row: T) => string;

  headerClass?: string;
  cellClass?: string;

  widthClass?: string;
};
