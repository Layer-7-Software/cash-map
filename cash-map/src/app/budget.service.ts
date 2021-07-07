import { Injectable } from '@angular/core';
import { IdService } from './id.service';
import { Budget } from './models/Budget';
import { Expense } from './models/Expense';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(protected idService: IdService) { }

  newExpense(budget: Budget): void {
    budget.expenses.push(new Expense({ id: this.idService.newId() }));
  }

  removeExpense(budget: Budget, id: string): void {
    const index = budget.expenses.findIndex(e => e.id === id);
    if (index >= 0) {
      budget.expenses.splice(index, 1);
    }
  }

  totalExpenses(budget: Budget): number {
    let sum = 0;
    for (let expense of budget.expenses) {
      sum += expense.value;
    }
    return sum;
  }

  net(budget: Budget): number {
    const taxes = (budget.income * budget.percentageOfIncomeForTaxes / 100);
    const monthlyExpensesForOneYear = this.totalExpenses(budget) * 12;

    return budget.income - taxes - monthlyExpensesForOneYear;
  }
}
