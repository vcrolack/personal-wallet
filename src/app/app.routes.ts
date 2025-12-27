import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/public.guard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [publicGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
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
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/budgets/budgets.page.component').then(
                (m) => m.BudgetsPageComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './pages/budgets/views/budget-detail/budget-detail.component'
              ).then((m) => m.BudgetDetailComponent),
          },
        ],
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
              import(
                './pages/catalog/categories/categories.page.component'
              ).then((m) => m.CategoriesPageComponent),
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
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
