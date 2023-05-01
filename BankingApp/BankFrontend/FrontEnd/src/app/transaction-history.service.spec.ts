import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionHistoryService } from './transaction-history.service';
import { UserDataService } from './user-data.service';
import { of } from 'rxjs';
import { Transaction } from './Interfaces/transaction';
import { HttpClient } from '@angular/common/http';

describe('TransactionHistoryService', () => {
  let service: TransactionHistoryService;
  let httpMock: HttpTestingController;
  let userDataSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(() => {
    const userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getUserId']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionHistoryService,
        { provide: UserDataService, useValue: userDataServiceSpy }
      ]
    });
    service = TestBed.inject(TransactionHistoryService);
    httpMock = TestBed.inject(HttpTestingController);
    userDataSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMostRecentTransactions', () => {
    it('should return an Observable of Transaction[]', () => {
      const transactions: Transaction[] = [{ amount: 1.00, senderEmail: "email@email.com", recipientEmail: "email@email.com", createdAt: new Date(), description: "Desc", id: 0, status: 0, ramount: 1.5 }];
      const userId = 1;
      userDataSpy.getUserId.and.returnValue(userId);

      service.getMostRecentTransactions(userId).subscribe((response: Transaction[]) => {
        expect(response).toEqual(transactions);
      });

      const request = httpMock.expectOne(`https://wiz-docker3.azurewebsites.net/Transaction/transaction/number/${userId}`);
      expect(request.request.method).toBe('GET');
      request.flush(transactions);
    });
  });

  describe('getTransactions', () => {
    it('should return an Observable of Transaction[]', () => {
      const transactions: Transaction[] = [{
        amount: 0,
        senderEmail: '',
        recipientEmail: '',
        createdAt: new Date(),
        description: '',
        id: 0,
        status: 1,
        ramount: 12.5
      }
      ];

      const userId = 1;
      userDataSpy.getUserId.and.returnValue(userId);

      service.getTransactions(userId).subscribe((response: Transaction[]) => {
        expect(response).toEqual(transactions);
      });

      const request = httpMock.expectOne(`https://wiz-docker3.azurewebsites.net/Transaction/transaction/${userId}`);
      expect(request.request.method).toBe('GET');
      request.flush(transactions);
    });
  });
});