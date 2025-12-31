import { BudgetGroupModel } from './budget-group.model';

export interface BudgetModel {
  id: string;
  title: string;
  description: string;
  budgetAmount: number;
  totalSpent: number;
  percentageSpent: number;
  startDate: Date;
  endDate: Date;
  isShared: boolean;

  groups: BudgetGroupModel[];
}
