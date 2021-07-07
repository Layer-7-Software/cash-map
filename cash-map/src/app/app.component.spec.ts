import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BudgetService } from './budget.service';
import { IdService } from './id.service';
import { Budget } from './models/Budget';

describe('AppComponent', () => {
  let budgetService: BudgetService;

  beforeEach(async () => {
    budgetService = new BudgetService(new IdService());

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: BudgetService, useValue: budgetService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Cash Map');
  });

  describe('when adding an expense', () => {
    let component: AppComponent;
    let budget: Budget;

    function act() {
      component.addExpense();
    }

    beforeEach(() => {
      budget = new Budget();
      const fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      component.budget = budget;
    });

    it('adds the expense via the budget service', () => {
      spyOn(budgetService, 'newExpense').and.callFake(() => {});
      act();
      expect(budgetService.newExpense).toHaveBeenCalledWith(budget);
    });
  });

  describe('when removing an expense', () => {
    let component: AppComponent;
    let budget: Budget;
    let id: string;

    beforeEach(() => {
      const fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      budget = new Budget();
      id = 'some id';
      component.budget = budget;
    });

    function act() {
      component.removeExpense(id);
    }

    it('removes the expense via the budget service', () => {
      spyOn(budgetService, 'removeExpense').and.callFake(() => {});
      act();
      expect(budgetService.removeExpense).toHaveBeenCalledWith(budget, id);
    });
  });

  describe('when getting the net amount', () => {
    let component: AppComponent;
    let budget: Budget;

    beforeEach(() => {
      const fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
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
