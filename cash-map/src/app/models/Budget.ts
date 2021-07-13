import { Expense } from "./Expense";

export class Budget {
  income: number;
  percentageOfIncomeForTaxes: number;
  expenses: Expense[];

  constructor() {
    this.income = 0;
    this.percentageOfIncomeForTaxes = 0;
    this.expenses = [new Expense()];
  }
}
