export type ColumnAlign = 'left' | 'center' | 'right';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  active: string;
  direction: SortDirection;
}

export type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  align?: ColumnAlign;

  accessor?: (row: T) => unknown;
  formatter?: (value: unknown, row: T) => string;

  sortable?: boolean;
  sortKey?: string;
  sortFn?: (a: T, b: T, direction: 'asc' | 'desc') => number;

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

export interface TablePagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
