import { TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BudgetService } from '../budget.service';
import { MaterialModule } from '../material.module';
import { IdService } from '../id.service';
import { Budget } from '../models/Budget';
import { ExpenseInterval } from '../models/ExpenseInterval';

describe('AppComponent', () => {
  let component: BudgetComponent;
  let budgetService: BudgetService;

  beforeEach(async () => {
    budgetService = new BudgetService(new IdService());

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      declarations: [
        BudgetComponent
      ],
      providers: [
        { provide: BudgetService, useValue: budgetService },
      ]
    }).compileComponents();
  });

  function createComponent(): void {
    const fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BudgetComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a header', () => {
    const fixture = TestBed.createComponent(BudgetComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Cash Map');
  });

  describe('when getting monthly expenses', () => {
    let budget: Budget;

    function act() {
      component.monthlyExpenses();
    }

    beforeEach(() => {
      budget = new Budget();
      createComponent();
      component.budget = budget;
    });

    it('gets the expenses via the budget service', () => {
      spyOn(budgetService, 'getExpenses').and.callFake(() => { return []; });
      act();
      expect(budgetService.getExpenses).toHaveBeenCalledWith(budget, ExpenseInterval.Monthly);
    });
  });

  describe('when getting non-recurring expenses', () => {
    let budget: Budget;

    function act() {
      component.nonRecurringExpenses();
    }

    beforeEach(() => {
      budget = new Budget();
      createComponent();
      component.budget = budget;
    });

    it('gets the expenses via the budget service', () => {
      spyOn(budgetService, 'getExpenses').and.callFake(() => { return []; });
      act();
      expect(budgetService.getExpenses).toHaveBeenCalledWith(budget, ExpenseInterval.OneTime);
    });
  });

  describe('when adding a non-recurring expense', () => {
    let budget: Budget;

    function act() {
      component.addNonRecurringExpense();
    }

    beforeEach(() => {
      budget = new Budget();
      createComponent();
      component.budget = budget;
    });

    it('adds the expense via the budget service', () => {
      spyOn(budgetService, 'newExpense').and.callFake(() => { });
      act();
      expect(budgetService.newExpense).toHaveBeenCalledWith(budget, ExpenseInterval.OneTime);
    });
  });

  describe('when adding a monthly expense', () => {
    let budget: Budget;

    function act() {
      component.addMonthlyExpense();
    }

    beforeEach(() => {
      budget = new Budget();
      createComponent();
      component.budget = budget;
    });

    it('adds the expense via the budget service', () => {
      spyOn(budgetService, 'newExpense').and.callFake(() => { });
      act();
      expect(budgetService.newExpense).toHaveBeenCalledWith(budget, ExpenseInterval.Monthly);
    });
  });

  describe('when removing an expense', () => {
    let budget: Budget;
    let id: string;

    beforeEach(() => {
      createComponent();
      budget = new Budget();
      id = 'some id';
      component.budget = budget;
    });

    function act() {
      component.removeExpense(id);
    }

    it('removes the expense via the budget service', () => {
      spyOn(budgetService, 'removeExpense').and.callFake(() => { });
      act();
      expect(budgetService.removeExpense).toHaveBeenCalledWith(budget, id);
    });
  });

  describe('when getting the net amount', () => {
    let budget: Budget;

    beforeEach(() => {
      createComponent();
      budget = new Budget();
      component.budget = budget;
    });

    function act() {
      component.net();
    }

    it('gets the value via the budget service', () => {
      spyOn(budgetService, 'net').and.returnValue(0);
      act();
      expect(budgetService.net).toHaveBeenCalledWith(budget);
    });
  });
});
