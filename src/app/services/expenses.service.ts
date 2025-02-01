import { Injectable } from '@angular/core';
import { Database, ref, onValue, push, set, update, remove } from '@angular/fire/database';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { Expense } from '../interfaces/expense';
import { Filter } from '../interfaces/filter';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private expenses$ = new BehaviorSubject<Expense[]>([]);
  private filterCriteria$ = new BehaviorSubject<Filter>({
    amount: undefined,
    filterDates: undefined,
  });

  filteredData$ = combineLatest([this.expenses$, this.filterCriteria$]).pipe(
    map(([data, criteria]) => {
      if (!criteria.amount && criteria.filterDates) {
        const dates = criteria?.filterDates;
        return data.filter(
          (exp) => exp.createdAt >= dates[0] && exp.createdAt <= dates[1]
        );
      } else if (criteria.amount && !criteria.filterDates) {
        return data.filter((exp) => exp.amount === criteria?.amount);
      } else if (criteria.amount && criteria.filterDates) {
        const dates = criteria?.filterDates;
        return data.filter(
          (exp) =>
            exp.createdAt >= dates[0] &&
            exp.createdAt <= dates[1] &&
            exp.amount === criteria?.amount
        );
      } else {
        return data;
      }
    })
  );

  expenseData: Expense[] = [];
  userId: any;
  dbRef: any;

  constructor(private db: Database, private authSvc: AuthService) {
    this.userId = this.authSvc.getUserId();
    this.dbRef = ref(this.db, `users/${this.userId}/expenses`);

    onValue(this.dbRef, (snapshot) => {
      const data = snapshot.val();
      const expenses = Object.keys(data).map((id) => ({ id, ...data[id] }));
      this.setExpenses(expenses);
    });
  }

  setExpenses(expenses: Expense[]) {
    this.expenses$.next(expenses);
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$.asObservable();
  }

  saveExpense(expense: Expense) {
    const newKey = push(this.dbRef).key;
    const newExpense = {
      description: expense.description,
      amount: expense.amount * 100,
      note: expense.note,
      createdAt: expense.createdAt.getTime(),
    };

    set(ref(this.db, `users/${this.userId}/expenses/${newKey}`), newExpense);
  }

  editExpense(expense: Expense) {
    const editedExpense = {
      description: expense.description,
      amount: expense.amount * 100,
      note: expense.note,
      createdAt: expense.createdAt.getTime(),
    };

    update(
      ref(this.db, `users/${this.userId}/expenses/${expense.id}`),
      editedExpense
    );
  }

  removeExpense(expense: Expense) {
    remove(ref(this.db, `users/${this.userId}/expenses/${expense.id}`));
  }

  setFilterCriteria(filters: Filter) {
    this.filterCriteria$.next(filters);
  }
}
