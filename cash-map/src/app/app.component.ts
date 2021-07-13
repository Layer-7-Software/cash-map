import { Component } from '@angular/core';
import { BudgetService } from './budget.service';
import { Budget } from "./models/Budget";
import { Expense } from './models/Expense';
import { ExpenseInterval } from './models/ExpenseInterval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  budget: Budget;

  constructor(private budgetService: BudgetService) {
    this.budget = new Budget();
  }

  nonRecurringExpenses(): Expense[] {
    return this.budgetService.getExpenses(this.budget, ExpenseInterval.OneTime);
  }

  monthlyExpenses(): Expense[] {
    return this.budgetService.getExpenses(this.budget, ExpenseInterval.Monthly);
  }
  
  addNonRecurringExpense(): void {
    this.budgetService.newExpense(this.budget, ExpenseInterval.OneTime);
  }

  addMonthlyExpense(): void {
    this.budgetService.newExpense(this.budget, ExpenseInterval.Monthly);
  }

  removeExpense(id: string): void {
    this.budgetService.removeExpense(this.budget, id);
  }

  net(): number {
    return this.budgetService.net(this.budget);
  }

}
