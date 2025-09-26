import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page.component').then(
        (m) => m.DashboardPageComponent
      ),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./pages/transactions/transactions.page.component').then(
        (m) => m.TransactionsPageComponent
      ),
  },
  {
    path: 'budgets',
    loadComponent: () =>
      import('./pages/budgets/budgets.page.component').then(
        (m) => m.BudgetsPageComponent
      ),
  },
  {
    path: 'accounts',
    loadComponent: () =>
      import('./pages/accounts/accounts.page.component').then(
        (m) => m.AccountsPageComponent
      ),
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/catalog/categories/categories.page.component').then(
            (m) => m.CategoriesPageComponent
          ),
      },
      {
        path: 'rules',
        loadComponent: () =>
          import('./pages/catalog/rules/rules.page.component').then(
            (m) => m.RulesPageComponent
          ),
      },
    ],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page.component').then(
        (m) => m.SettingsPageComponent
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
