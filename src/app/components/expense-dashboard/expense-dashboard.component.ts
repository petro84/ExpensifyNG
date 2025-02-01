import { Component } from '@angular/core';

import { ExpenseListFiltersComponent } from '../expense-list-filters/expense-list-filters.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ExpenseSummaryComponent } from '../expense-summary/expense-summary.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-expense-dashboard',
  imports: [
    HeaderComponent,
    ExpenseSummaryComponent,
    ExpenseListFiltersComponent,
    ExpenseListComponent,
  ],
  templateUrl: './expense-dashboard.component.html',
  styleUrl: './expense-dashboard.component.css',
})
export class ExpenseDashboardComponent {}
