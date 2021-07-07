export class Expense {
  id: string = '';
  label: string = '';
  value: number = 0;

  constructor(init?: Partial<Expense>) {
    Object.assign(this, init);
  }
}
