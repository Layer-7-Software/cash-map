import { Expense } from "./Expense";
import { IncomeInterval } from "./IncomeInterval";

export class Budget {
  income: number;
  incomeInterval: IncomeInterval;
  percentageOfIncomeForTaxes: number;
  expenses: Expense[];

  constructor() {
    this.income = 0;
    this.incomeInterval = IncomeInterval.Yearly;
    this.percentageOfIncomeForTaxes = 0;
    this.expenses = [];
  }
}
