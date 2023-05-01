import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { NEVER, Observable, Operator, of, throwError } from 'rxjs';
import { LoanApplyComponent } from './loan-apply.component';
import { LoanServicesService } from '../loan-services.service';
import { UserDataService } from '../user-data.service';
import { Loan, LoanSchedule } from '../Interfaces/loan';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');

describe('LoanApplyComponent', () => {
  let component: LoanApplyComponent;
  let fixture: ComponentFixture<LoanApplyComponent>;
  let loanService: LoanServicesService;
  let userDataService: UserDataService;
  let cookieService: CookieService;
  let httpMock: HttpTestingController;
  let router: any;
  let windowMock: any;
  let loanServiceSpy: jasmine.SpyObj<LoanServicesService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;



  beforeEach(async () => {
    const spyLoan = jasmine.createSpyObj('LoanService', ['makePayment']);
    const spyCookie = jasmine.createSpyObj('CookieService', ['get']);
    await TestBed.configureTestingModule({
      declarations: [LoanApplyComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        LoanServicesService,
        UserDataService,
        CookieService,
        { provide: Router, useValue: router },
        { provide: WINDOW, useValue: windowMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    loanServiceSpy = TestBed.inject(LoanServicesService) as jasmine.SpyObj<LoanServicesService>;
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    // component = TestBed.createComponent(LoanApplyComponent).componentInstance;


    router = {
      navigate: jasmine.createSpy('navigate')
    };
    windowMock = {
      location: {
        reload: jasmine.createSpy('reload')

      }
    }


    fixture = TestBed.createComponent(LoanApplyComponent);
    component = fixture.componentInstance;
    loanService = TestBed.inject(LoanServicesService);
    userDataService = TestBed.inject(UserDataService);
    cookieService = TestBed.inject(CookieService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    // userDataService = { retrieveBusinessTypeFromDB: () => new Observable<string> };
  });




  // afterEach(() => {
  //   windowMock.location.calls.reset();
  // });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the current loan when initialized', () => {
    spyOn(component, 'getCurrentLoan').and.returnValue(of({}));
    component.ngOnInit();
    expect(component.getCurrentLoan).toHaveBeenCalled();
  });

  it('should calculate the monthly payment amount correctly', () => {
    const ir = 10;
    const np = 12;
    const pv = 10000;
    const fv = 0;
    const type = 0;
    const expected = 879.16;
    const result = (component.PMT(ir / 100 / 12, np, pv, fv, type) * (-1)).toFixed(2);
    expect(result).toEqual(expected as unknown as string + '');
  });

  it('should calculate the payoff date correctly', () => {
    const days = 365;
    const expected = new Date();
    expected.setDate(expected.getDate() + days);
    const result = component.getPayoffDate(days);
    expect(result).toEqual(expected);
  });

  it('should create a loan schedule correctly', () => {
    const amount = 10000;
    const interest = 10;
    const period = 1;
    component.amount = amount;
    component.interest = interest;
    component.period = period;
    component.createSchedule();
    const expected: LoanSchedule[] = [
      {
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        payment: 879.16,
        interest: 83.33,
        principal: 795.83,
        balance: 9204.17,
        totalInterest: 83.33
      },
      {
        date: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        payment: 879.16,
        interest: 76.68,
        principal: 802.48,
        balance: 8401.69,
        totalInterest: 159.01
      },
    ]
  })
  it('should not call userDataService.retrieveBusinessTypeFromDB if loanForm is invalid', () => {
    spyOn(userDataService, 'retrieveBusinessTypeFromDB').and.callThrough();
    const form = component.loanForm;
    form.controls['amount'].setValue('');
    form.controls['period'].setValue('');
    component.onLoanFormSubmit(new Event('submit'));
    expect(userDataService.retrieveBusinessTypeFromDB).not.toHaveBeenCalled();
  });

  it('should call userDataService.retrieveBusinessTypeFromDB if loanForm is valid', () => {
    spyOn(userDataService, 'retrieveBusinessTypeFromDB').and.returnValue({
      subscribe: (callback: any) => {
        return callback('small');
      },
      source: undefined,
      operator: undefined,
      lift: function <R>(operator?: Operator<string, R> | undefined): Observable<R> {
        throw new Error('Function not implemented.');
      },
      forEach: function (next: (value: string) => void): Promise<void> {
        throw new Error('Function not implemented.');
      },
      pipe: function (): Observable<string> {
        throw new Error('Function not implemented.');
      },
      toPromise: function (): Promise<string | undefined> {
        throw new Error('Function not implemented.');
      }
    })
    const form = component.loanForm;
    form.controls['amount'].setValue(1000);
    form.controls['period'].setValue(12);
    component.onLoanFormSubmit(new Event('submit'));
    expect(userDataService.retrieveBusinessTypeFromDB).toHaveBeenCalled();
  });

  it('should update interest, payment, and period based on loanForm and business_type', () => {
    spyOn(userDataService, 'retrieveBusinessTypeFromDB').and.returnValue({
      subscribe: (callback: any) => {
        return callback('small');
      },
      source: undefined,
      operator: undefined,
      lift: function <R>(operator?: Operator<string, R> | undefined): Observable<R> {
        throw new Error('Function not implemented.');
      },
      forEach: function (next: (value: string) => void): Promise<void> {
        throw new Error('Function not implemented.');
      },
      pipe: function (): Observable<string> {
        throw new Error('Function not implemented.');
      },
      toPromise: function (): Promise<string | undefined> {
        throw new Error('Function not implemented.');
      }
    });

    const form = component.loanForm;
    form.controls['amount'].setValue(10000);
    form.controls['period'].setValue(12);
    component.onLoanFormSubmit(new Event('submit'));
    expect(component.interest).toEqual(3.5);
    expect(component.payment).toEqual(849.22);
    expect(component.period).toEqual(12);
  });

  it('should update interest and payment based on loanForm and business_type for nonprofit', () => {
    spyOn(userDataService, 'retrieveBusinessTypeFromDB').and.returnValue({
      subscribe: (callback: any) => {
        return callback('nonprofit');
      },
      source: undefined,
      operator: undefined,
      lift: function <R>(operator?: Operator<string, R> | undefined): Observable<R> {
        throw new Error('Function not implemented.');
      },
      forEach: function (next: (value: string) => void): Promise<void> {
        throw new Error('Function not implemented.');
      },
      pipe: function (): Observable<string> {
        throw new Error('Function not implemented.');
      },
      toPromise: function (): Promise<string | undefined> {
        throw new Error('Function not implemented.');
      }
    });
    const form = component.loanForm;
    form.controls['amount'].setValue(10000);
    form.controls['period'].setValue(12);
    component.onLoanFormSubmit(new Event('submit'));
    expect(component.interest).toEqual(1);
    expect(component.payment).toEqual(837.85);
  });

  it('should add a new loan and navigate to BusinessHome on success', () => {
    // Arrange
    const expectedLoan: Loan = {
      interestRate: 10.75,
      businessId: '123',
      amount: 10000,
      monthlyPay: -212.67,
      dateLoaned: new Date(),
      loanPaid: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      id: 0,
      amountPaid: 0
    };
    component.loan = expectedLoan;
    component.interest = 10.75;
    component.loanForm = new FormGroup({
      amount: new FormControl(expectedLoan.amount, Validators.required),
      period: new FormControl(12, Validators.required)
    });
    cookieService.set('userId', '123');

    const addNewLoanSpy = spyOn(loanService, 'addNewLoan').and.returnValue(of({}));

    // Act
    component.acceptLoan();

    // Assert
    expect(loanService.addNewLoan).toHaveBeenCalledWith(expectedLoan);
  });

  it('should not add a new loan or navigate on error', () => {
    // Arrange
    component.loanForm = new FormGroup({
      amount: new FormControl(10000, Validators.required),
      period: new FormControl(12, Validators.required)
    });
    cookieService.set('userId', '123');

    const addNewLoanSpy = spyOn(loanService, 'addNewLoan').and.returnValue(of({}));

    // Act
    component.acceptLoan();

    // Assert
    expect(loanService.addNewLoan).toHaveBeenCalledWith(jasmine.any(Object));
    expect(router.navigate).not.toHaveBeenCalled();
  });
  it('should set monthlyAmountButton to true and customAmountButton and fullAmountButton to false when toggleMonthlyBill() is called', () => {
    component.toggleMonthlyBill();
    expect(component.monthlyAmountButton).toBe(true);
    expect(component.customAmountButton).toBe(false);
    expect(component.fullAmountButton).toBe(false);
  });

  it('should set customAmountButton to true and monthlyAmountButton and fullAmountButton to false when toggleCustomBill() is called', () => {
    component.toggleCustomBill();
    expect(component.customAmountButton).toBe(true);
    expect(component.monthlyAmountButton).toBe(false);
    expect(component.fullAmountButton).toBe(false);
  });

  it('should set fullAmountButton to true and monthlyAmountButton and customAmountButton to false when toggleFullBill() is called', () => {
    component.toggleFullBill();
    expect(component.fullAmountButton).toBe(true);
    expect(component.monthlyAmountButton).toBe(false);
    expect(component.customAmountButton).toBe(false);
  });

  it('should set all bill buttons to false when toggleAllBillButtons() is called', () => {
    component.toggleAllBillButtons();
    expect(component.fullAmountButton).toBe(false);
    expect(component.monthlyAmountButton).toBe(false);
    expect(component.customAmountButton).toBe(false);
  });


  // it('should call loanService.makePayment() with the correct parameters in payLoan()', () => {
  //   // var reload = spyOn(windowMock.location, 'reload');

  //   const makePaymentSpy = spyOn(loanService, 'makePayment').and.returnValue(of({}));
  //   component.existingLoan = { amount: 5000, amountPaid: 1000, interestRate: 10, id: 0, businessId: "0", dateLoaned: new Date(), monthlyPay: 200, loanPaid: new Date() };
  //   component.payLoan(1000);
  //   expect(makePaymentSpy).toHaveBeenCalledWith(400, 123, 1000);
  // });

  // it('should call loanService.makePayment() with the correct parameters in payFullLoan()', () => {
  //   // var reload = spyOn(windowMock.location, 'reload');

  //   const makePaymentSpy = spyOn(loanService, 'makePayment').and.returnValue(of({}));
  //   component.existingLoan = { id: 0, businessId: '', dateLoaned: new Date(), monthlyPay: 210, loanPaid: new Date(), amount: 5000, amountPaid: 1000, interestRate: 10 };

  //   component.payFullLoan();
  //   expect(makePaymentSpy).toHaveBeenCalledWith(4000, 123, 4000);
  //   expect(location.reload).toHaveBeenCalled()

  // });

  // it('should call loanService.makePayment() with the correct parameters in payCustomLoan()', () => {
  //   // var reload = spyOn(windowMock.location, 'reload');
  //   const makePaymentSpy = spyOn(loanService, 'makePayment').and.returnValue(of({}));
  //   component.payLoanForm.controls['payAmount'].setValue(2000);
  //   component.payCustomLoan();
  //   expect(makePaymentSpy).toHaveBeenCalledWith(400, 123, 2000);
  // });

});

