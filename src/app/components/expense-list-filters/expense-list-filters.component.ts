import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';

import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-expense-list-filters',
  imports: [FormsModule, InputNumberModule, DatePickerModule],
  templateUrl: './expense-list-filters.component.html',
  styleUrl: './expense-list-filters.component.css'
})
export class ExpenseListFiltersComponent implements OnInit {
  searchAmount!: number;
  searchDates!: Date[];

  constructor(private expenseSvc: ExpensesService) {
    const defaultDate = new Date();

    const startDate = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth()
    );
    const endDate = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth() + 1,
      0
    );

    this.searchDates = [startDate, endDate];
  }

  ngOnInit(): void {
    this.expenseSvc.setFilterCriteria({
      amount: this.searchAmount,
      filterDates: this.searchDates,
    });
  }

  filterExpenses() {
    const amount = this.searchAmount === 0 ? undefined : this.searchAmount;
    const dates: Date[] | undefined =
      this.searchDates === null ? undefined : this.searchDates;

    this.expenseSvc.setFilterCriteria({ amount, filterDates: dates });
  }
}
