import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoanServicesService } from './loan-services.service';
import { Loan } from './Interfaces/loan';

describe('LoanServicesService', () => {
  let service: LoanServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanServicesService]
    });
    service = TestBed.inject(LoanServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addNewLoan', () => {
    it('should send a POST request to create a new loan', () => {
      const loan: Loan = {
        id: 0,
        amount: 0,
        businessId: '',
        interestRate: 0,
        dateLoaned: new Date(),
        loanPaid: new Date(),
        monthlyPay: 0,
        amountPaid: 0
      };
      const expectedResponse = { success: true };
      service.addNewLoan(loan).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
      const req = httpMock.expectOne('https://wiz-docker3.azurewebsites.net/Loan/New');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loan);
      req.flush(expectedResponse);
    });
  });

  describe('makePayment', () => {
    it('should send a PUT request to make a payment on a loan', () => {
      const payment = 1;
      const id = 1;
      const amount = 100;
      const expectedResponse = { success: true };
      service.makePayment(payment, id, amount).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
      const req = httpMock.expectOne(`https://wiz-docker3.azurewebsites.net/Loan/Pay/${id}/${amount}/${payment}`);
      expect(req.request.method).toBe('PUT');
      req.flush(expectedResponse);
    });
  });

  describe('getLoan', () => {
    it('should send a GET request to get loan information', () => {
      const id = 1;
      const expectedResponse = { amount: 1000, interest: 10, duration: 12 };
      service.getLoan(id).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
      const req = httpMock.expectOne(`https://wiz-docker3.azurewebsites.net/Loan/Info/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedResponse);
    });
  });
});
