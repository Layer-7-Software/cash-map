import { Injectable } from '@angular/core';
import { IdService } from './id.service';
import { Budget } from './models/Budget';
import { Expense } from './models/Expense';
import { ExpenseInterval } from './models/ExpenseInterval';
import { IncomeInterval } from './models/IncomeInterval';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(protected idService: IdService) { }

  addExpense(budget: Budget, interval?: ExpenseInterval): void {
    let expense = new Expense({
      id: this.idService.newId(),
    });
    if (interval) {
      expense.recurrence = interval;
    }
    budget.expenses.push(expense);
  }

  removeExpense(budget: Budget, id: string): void {
    const index = budget.expenses.findIndex(e => e.id === id);
    if (index >= 0) {
      budget.expenses.splice(index, 1);
    }
  }

  incomePerYear(budget: Budget): number {
    return budget.income * this.numberOfIncomesPerYear(budget.incomeInterval);
  }
  
  net(budget: Budget): number {
    return this.incomePerYear(budget) - this.taxesPerYear(budget) - this.totalExpensesPerYear(budget);
  }
  
  taxesPerYear(budget: Budget): number {
    return this.incomePerYear(budget) * budget.percentageOfIncomeForTaxes / 100;
  }

  private numberOfIncomesPerYear(interval: IncomeInterval): number {
    return interval === IncomeInterval.Yearly ? 1 : 0;
  }

  private totalExpensesPerYear(budget: Budget): number {
    return this.totalNonRecurringExpenses(budget) + this.monthlyExpensesPerYear(budget);
  }

  private totalNonRecurringExpenses(budget: Budget): number {
    return this.sumExpenses(budget.expenses.filter(e => e.recurrence === ExpenseInterval.OneTime));
  }

  private monthlyExpensesPerYear(budget: Budget): number {
    return this.sumExpenses(budget.expenses.filter(e => e.recurrence === ExpenseInterval.Monthly)) * 12;
  }

  private sumExpenses(expenses: Expense[]): number {
    let sum = 0;
    for (let expense of expenses) {
      sum += expense.value;
    }
    return sum;
  }
}
