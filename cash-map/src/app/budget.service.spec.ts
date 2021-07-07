import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { IdService } from './id.service';
import { Budget } from './models/Budget';
import { Expense } from './models/Expense';

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

  describe('when adding a new expense', () => {
    let budget: Budget;

    function act() {
      service.newExpense(budget);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      it('adds an expense', () => {
        act();
        expect(budget.expenses.length).toEqual(1);
      });

      it('assigns an id from the id service', () => {
        const expenseId = 'hello there';
        spyOn(idService, 'newId').and.returnValue(expenseId);

        act();

        expect(budget.expenses.pop()?.id).toEqual(expenseId);
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
            new Expense({id: '1'}),
            new Expense({id: '2'}),
            new Expense({id: '3'}),
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
          const expenseToRemove = new Expense({id: '1'});
          const expenses = [
            expenseToRemove,
            new Expense({id: '2'}),
            new Expense({id: '3'}),
          ];
          budget.expenses = expenses;

          act();
          
          expect(budget.expenses).not.toContain(expenseToRemove);
        });
      });
    });
  });

  describe('when totaling expenses', () => {
    let budget: Budget;

    function act(): number {
      return service.totalExpenses(budget);
    }

    describe('given a defined budget', () => {
      beforeEach(() => {
        budget = new Budget();
      });

      describe('given no expenses', () => {
        beforeEach(() => {
          budget.expenses = [];
        });

        it('returns 0', () => {
          const actual = act();
          expect(actual).toEqual(0);
        });
      });

      describe('given some expenses', () => {
        beforeEach(() => {
          budget.expenses = [
            new Expense({value: 10}),
            new Expense({value: 25}),
            new Expense({value: 30}),
          ];
        });

        it('returns the sum', () => {
          const actual = act();
          expect(actual).toEqual(65);
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
              new Expense({value: 10}),
              new Expense({value: 15})
            ];
          });
  
          it('subtracts the total monthly expenses for a year from income', () => {
            const actual = act();
            expect(actual).toEqual(700);
          });
        });
      });
    });
  });

});
