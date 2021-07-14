import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { CacheService } from '../cache.service';
import { Budget } from '../models/Budget';
import { Expense } from '../models/Expense';
import { ExpenseInterval } from '../models/ExpenseInterval';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget: Budget;

  constructor(
    private budgetService: BudgetService,
    private cacheService: CacheService
  ) {
    this.budget = this.cacheService.load();
  }

  ngOnInit(): void {
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