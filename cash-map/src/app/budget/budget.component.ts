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

  get chart(): any {
    let labels = this.budget.expenses.map(e => e.label);
    labels.push('Taxes');
    labels.push('Net');

    let values = this.budget.expenses.map(e => e.value * (e.recurrence == ExpenseInterval.OneTime ? 1 : 12));
    values.push(this.budgetService.taxesPerYear(this.budget));
    values.push(this.budgetService.net(this.budget));

    return {
      labels: labels,
      datasets: [{
        label: 'Breakdown',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  }

  get options(): any {
    return {
      "responsive": true,
      "aspectRatio": 1
    };
  }

}
