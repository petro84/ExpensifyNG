import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Expense } from '../../interfaces/expense';
import { ExpensesService } from '../../services/expenses.service';
import { ModifyExpenseComponent } from '../modify-expense/modify-expense.component';
import { ModifyExpenseHeaderComponent } from '../modify-expense-header/modify-expense-header.component';

@Component({
  selector: 'app-expense-summary',
  imports: [ButtonModule, CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css',
  providers: [DialogService]
})
export class ExpenseSummaryComponent implements OnInit {
  expenses!: Expense[];

  constructor(
    private expenseSvc: ExpensesService,
    private dialogSvc: DialogService
  ) {}

  ref!: DynamicDialogRef;

  ngOnInit(): void {
    this.expenseSvc.filteredData$.subscribe((data) => (this.expenses = data));
  }

  get numberOfExpenses(): number {
    return this.expenses.length;
  }

  get totalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  addExpense() {
    this.ref = this.dialogSvc.open(ModifyExpenseComponent, {
      header: 'Add Expense',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
      templates: {
        header: ModifyExpenseHeaderComponent,
      },
    });
  }
}
