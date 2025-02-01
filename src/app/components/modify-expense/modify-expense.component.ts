import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { Expense } from '../../interfaces/expense';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-modify-expense',
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, DatePickerModule, ButtonModule, TextareaModule],
  templateUrl: './modify-expense.component.html',
  styleUrl: './modify-expense.component.css'
})
export class ModifyExpenseComponent {
  expenseForm!: FormGroup;
  expense!: Expense;
  configData!: any;
  isEdit!: boolean;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private expenseSvc: ExpensesService,
    private config: DynamicDialogConfig
  ) {
    this.configData = this.config;
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      id: [null],
      description: [null, Validators.required],
      amount: [null, Validators.required],
      createdAt: [new Date(), Validators.required],
      note: [null],
    });

    if (this.configData.header.includes('Edit')) {
      this.patchForm(this.configData.data['expense']);
      this.isEdit = true;
    }
  }

  patchForm(expense: Expense) {
    this.expenseForm.patchValue({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      createdAt: new Date(expense.createdAt),
      note: expense.note,
    });
  }

  save(formValues: any) {
    if (this.isEdit) {
      this.expenseSvc.editExpense(formValues);
    } else {
      this.expenseSvc.saveExpense(formValues);
    }
    this.ref.close();
  }

  delete(formValues: any) {
    this.expenseSvc.removeExpense(formValues);
    this.ref.close();
  }
}
