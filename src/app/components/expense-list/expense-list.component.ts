import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';

import { ModifyExpenseHeaderComponent } from '../modify-expense-header/modify-expense-header.component';
import { ModifyExpenseComponent } from '../modify-expense/modify-expense.component';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../interfaces/expense';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, TableModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
  providers: [DialogService]
})
export class ExpenseListComponent implements OnInit {
  expenses!: Expense[];
  selectedExpense!: Expense;

  constructor(
    private expenseSvc: ExpensesService,
    private dialogSvc: DialogService
  ) {}

  ref!: DynamicDialogRef;

  ngOnInit(): void {
    this.expenseSvc.filteredData$.subscribe(
      (expenses) => (this.expenses = expenses)
    );
  }

  editExpense() {
    this.ref = this.dialogSvc.open(ModifyExpenseComponent, {
      header: 'Edit Expense',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      data: {
        isEdit: true,
        expense: this.selectedExpense,
      },
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
      templates: {
        header: ModifyExpenseHeaderComponent,
      },
    });
  }
}
