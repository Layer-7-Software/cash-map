import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { CacheService } from '../cache.service';
import { Budget } from '../models/Budget';
import { Expense } from '../models/Expense';
import { ExpenseInterval } from '../models/ExpenseInterval';
import { IncomeInterval } from '../models/IncomeInterval';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget: Budget;
  incomeInterval: IncomeInterval;

  incomeIntervals = IncomeInterval;
  incomeIntervalKeys: number[];
  expenseIntervals = ExpenseInterval;
  expenseIntervalKeys: number[];

  constructor(
    private budgetService: BudgetService,
    private cacheService: CacheService
  ) {
    this.budget = this.cacheService.load();
    this.incomeInterval = this.budget.incomeInterval;
    this.incomeIntervalKeys = Object.keys(this.incomeIntervals).filter(k => !isNaN(Number(k))).map(Number);
    this.expenseIntervalKeys = Object.keys(this.expenseIntervals).filter(k => !isNaN(Number(k))).map(Number);
  }

  ngOnInit(): void {
  }

  expenses(): Expense[] {
    return this.budget.expenses;
  }

  addExpense(): void {
    this.budgetService.addExpense(this.budget);
  }

  removeExpense(id: string): void {
    this.budgetService.removeExpense(this.budget, id);
  }

  net(): number {
    return this.budgetService.net(this.budget);
  }

  removeExpense(id: string): void {
    this.budgetService.removeExpense(this.budget, id);
  }

  net(): number {
    return this.budgetService.net(this.budget);
  }

}
