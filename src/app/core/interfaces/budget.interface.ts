export interface Budget {
  id: string;
  title: string;
  budgetAmount: number;
  description: string;
  startDate: string;
  endDate: string;
  isShared: boolean;
  user: { id: string };
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
}
