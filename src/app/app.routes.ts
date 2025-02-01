import { Routes } from '@angular/router';

import { ExpenseDashboardComponent } from './components/expense-dashboard/expense-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { secureAuthGuard } from './guards/secure-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: ExpenseDashboardComponent,
    canActivate: [secureAuthGuard],
  },
];
