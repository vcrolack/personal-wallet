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
  pipe?: 'date' | 'currency' | 'number';
  pipeArgs?: string;
  actions?: TableAction<T>[];
};

export interface TableAction<T> {
  label: string;
  icon?: string;
  class?: string;
  callback: (row: T) => void;
  show?: (row: T) => boolean;
}
