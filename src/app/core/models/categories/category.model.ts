export enum CategoryRule {
  NEED = 'Necesidad',
  WANT = 'Lujos',
  SAVING = 'Ahorros',
}
export interface CategoryModel {
  id: number;
  name: string;
  rule: CategoryRule;
}
