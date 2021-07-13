import { ExpenseInterval } from "./ExpenseInterval";

export class Expense {
  id: string = '';
  label: string = '';
  value: number = 0;
  recurrence: ExpenseInterval = ExpenseInterval.OneTime;

  constructor(init?: Partial<Expense>) {
    Object.assign(this, init);
  }
}
