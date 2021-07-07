import { Component } from '@angular/core';
import { BudgetService } from './budget.service';
import { Budget } from "./models/Budget";

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
  
  addExpense() {
    this.budgetService.newExpense(this.budget);
  }

  removeExpense(id: string) {
    this.budgetService.removeExpense(this.budget, id);
  }

  net(): number {
    return this.budgetService.net(this.budget);
  }

}
