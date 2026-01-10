import { Routes } from '@angular/router';
import { publicGuard } from './core/guards/public.guard';
import { MainLayoutComponent } from './common/components/layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login.page.component').then(
        (m) => m.LoginPageComponent
      ),
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
          import(
            './features/dashboard/pages/dashboard-page/dashboard.page.component'
          ).then((m) => m.DashboardPageComponent),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import(
            './features/transactions/pages/transactions-page/transactions.page.component'
          ).then((m) => m.TransactionsPageComponent),
      },
      {
        path: 'budgets',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/budgets/pages/budgets-page/budgets.page.component'
              ).then((m) => m.BudgetsPageComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './features/budgets/pages/budget-detail-page/budget-detail.component'
              ).then((m) => m.BudgetDetailComponent),
          },
        ],
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import(
            './features/accounts/pages/accounts-page/accounts.page.component'
          ).then((m) => m.AccountsPageComponent),
      },
      {
        path: 'catalog',
        children: [
          {
            path: 'categories',
            loadComponent: () =>
              import(
                './features/catalog/categories/pages/categories-page/categories.page.component'
              ).then((m) => m.CategoriesPageComponent),
          },
          {
            path: 'rules',
            loadComponent: () =>
              import(
                './features/catalog/rules/pages/rules-page/rules.page.component'
              ).then((m) => m.RulesPageComponent),
          },
        ],
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            './features/settings/pages/settings-page/settings.page.component'
          ).then((m) => m.SettingsPageComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
