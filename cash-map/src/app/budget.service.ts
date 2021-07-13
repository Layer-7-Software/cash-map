import { Injectable } from '@angular/core';
import { IdService } from './id.service';
import { Budget } from './models/Budget';
import { Expense } from './models/Expense';
import { ExpenseInterval } from './models/ExpenseInterval';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(protected idService: IdService) { }

  getExpenses(budget: Budget, recurrence?: ExpenseInterval): Expense[] {
    if (!recurrence) {
      return budget.expenses;
    }
    return budget.expenses.filter(e => e.recurrence === recurrence);
  }

  newExpense(budget: Budget, interval: ExpenseInterval): void {
    budget.expenses.push(new Expense({
      id: this.idService.newId(),
      recurrence: interval
    }));
  }

  removeExpense(budget: Budget, id: string): void {
    const index = budget.expenses.findIndex(e => e.id === id);
    if (index >= 0) {
      budget.expenses.splice(index, 1);
    }
  }

  net(budget: Budget): number {
    return budget.income - this.taxes(budget) - this.totalExpenses(budget);
  }

  private taxes(budget: Budget): number {
    return budget.income * budget.percentageOfIncomeForTaxes / 100;
  }

  private totalExpenses(budget: Budget): number {
    return this.totalNonRecurringExpenses(budget) + this.monthlyExpensesForOneYear(budget);
  }

  private totalNonRecurringExpenses(budget: Budget): number {
    let sum = 0;
    for (let expense of this.getExpenses(budget, ExpenseInterval.OneTime)) {
      sum += expense.value;
    }
    return sum;
  }

  private monthlyExpensesForOneYear(budget: Budget): number {
    let sum = 0;
    for (let expense of this.getExpenses(budget, ExpenseInterval.Monthly)) {
      sum += expense.value;
    }
    return sum * 12;
  }
}
