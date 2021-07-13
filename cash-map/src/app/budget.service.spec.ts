import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { IdService } from './id.service';
import { Budget } from './models/Budget';
import { Expense } from './models/Expense';
import { ExpenseInterval } from './models/ExpenseInterval';

describe('BudgetService', () => {
  let service: BudgetService;
  let idService: IdService;

  beforeEach(() => {
    idService = new IdService();

    TestBed.configureTestingModule({
      providers: [
        { provide: IdService, useValue: idService }
      ]
    });
    service = TestBed.inject(BudgetService);
  });

  describe('when getting expenses', () => {
    let budget: Budget;
    let interval: any;

    function act(): Expense[] {
      return service.getExpenses(budget, interval);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      describe('given no interval', () => {
        beforeEach(() => {
          interval = undefined;
        });

        it('returns all expenses', () => {
          budget.expenses = [
            new Expense(),
            new Expense(),
            new Expense(),
          ];
          const actual = act();

          expect(budget.expenses).toEqual(actual);
        });
      });

      describe('given an interval', () => {
        beforeEach(() => {
          interval = ExpenseInterval.Monthly;
        });

        it('returns expenses with the given interval', () => {
          budget.expenses = [
            new Expense({ recurrence: ExpenseInterval.Monthly }),
            new Expense({ recurrence: ExpenseInterval.Monthly }),
            new Expense({ recurrence: ExpenseInterval.OneTime }),
            new Expense({ recurrence: ExpenseInterval.OneTime }),
            new Expense({ recurrence: ExpenseInterval.OneTime }),
          ];
          const actual = act();

          expect(actual.length).toEqual(2);
        });
      });
    });
  });

  describe('when adding a new expense', () => {
    let budget: Budget;
    let interval: ExpenseInterval;

    function act() {
      service.newExpense(budget, interval);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      describe('given an interval', () => {
        beforeEach(() => {
          interval = ExpenseInterval.Monthly;
        });

        it('adds an expense', () => {
          const previousLength = budget.expenses.length;

          act();

          expect(budget.expenses.length).toEqual(previousLength + 1);
        });

        it('assigns an id from the id service', () => {
          const expenseId = 'hello there';
          spyOn(idService, 'newId').and.returnValue(expenseId);

          act();

          expect(budget.expenses.pop()?.id).toEqual(expenseId);
        });

        it('creates an expense with the given interval', () => {
          act();

          expect(budget.expenses.pop()?.recurrence).toEqual(interval);
        });
      });
    });
  });

  describe('when removing an expense', () => {
    let budget: Budget;
    let id: string;

    function act() {
      service.removeExpense(budget, id);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      describe('given an id for an expense that does not exist', () => {
        beforeEach(() => {
          id = 'some fake id';
        });

        it('does not remove an expense', () => {
          const expenses = [
            new Expense({ id: '1' }),
            new Expense({ id: '2' }),
            new Expense({ id: '3' }),
          ];
          budget.expenses = expenses;

          act();

          expect(budget.expenses).toEqual(expenses);
        });
      });

      describe('given an id for an expense that exists', () => {
        beforeEach(() => {
          id = '1';
        });

        it('removes the expense', () => {
          const expenseToRemove = new Expense({ id: '1' });
          const expenses = [
            expenseToRemove,
            new Expense({ id: '2' }),
            new Expense({ id: '3' }),
          ];
          budget.expenses = expenses;

          act();

          expect(budget.expenses).not.toContain(expenseToRemove);
        });
      });
    });
  });

  describe('when finding the net amount', () => {
    let budget: Budget;

    function act(): number {
      return service.net(budget);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      describe('given income', () => {
        beforeEach(() => {
          budget.income = 1000;
        });

        it('returns the income', () => {
          const actual = act();
          expect(actual).toEqual(1000);
        });

        describe('given a percentage of income for taxes', () => {
          beforeEach(() => {
            budget.percentageOfIncomeForTaxes = 10;
          });

          it('subtracts taxes from income', () => {
            const actual = act();
            expect(actual).toEqual(900);
          });
        });

        describe('given monthly expenses', () => {
          beforeEach(() => {
            budget.expenses = [
              new Expense({ value: 10, recurrence: ExpenseInterval.Monthly }),
              new Expense({ value: 15, recurrence: ExpenseInterval.Monthly })
            ];
          });

          it('subtracts the total monthly expenses for a year from income', () => {
            const actual = act();
            expect(actual).toEqual(700);
          });
        });

        describe('given non-recurring expenses', () => {
          beforeEach(() => {
            budget.expenses = [
              new Expense({ value: 10, recurrence: ExpenseInterval.OneTime }),
              new Expense({ value: 15, recurrence: ExpenseInterval.OneTime })
            ];
          });

          it('subtracts the total non-recurring expenses from income', () => {
            const actual = act();
            expect(actual).toEqual(975);
          });
        });
      });
    });
  });

});
