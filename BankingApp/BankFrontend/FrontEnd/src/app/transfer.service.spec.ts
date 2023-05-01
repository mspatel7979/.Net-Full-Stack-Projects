import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let httpTestingController: HttpTestingController;
  let service: TransferService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransferService
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TransferService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('cardToWallet', () => {
    it('should make a POST request to the correct URL with the correct body', () => {
      const cardId = 123;
      const userId = 456;
      const amount = 789;
      const expectedUrl = `${service.apiRoot}Transaction/transaction/internal?type=3`;
      const expectedBody = { cardId, recipientId: userId, amount };

      // Mock the response from the API
      const expectedResponse = { success: true };
      // Call the function and subscribe to the result
      let result;
      service.cardToWallet(cardId, userId, amount).subscribe(res => {
        expect(res).toEqual(expectedResponse);
      });

      // Expect that a POST request was made with the correct URL and body
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);

      // Flush the request to return the expected response
      req.flush(expectedResponse);

      
    });
  });

  describe('walletToCard', () => {
    it('should make a POST request to the correct URL with the correct body', () => {
      const cardId = 123;
      const userId = 456;
      const amount = 789;
      const expectedUrl = `${service.apiRoot}Transaction/transaction/internal?type=2`;
      const expectedBody = { senderId: userId, cardId, amount };

      // Mock the response from the API
      const expectedResponse = { success: true };
      // Call the function and subscribe to the result
      let result;
      service.walletToCard(userId, cardId, amount).subscribe(res => {
        expect(res).toEqual(expectedResponse);
      });

      // Expect that a POST request was made with the correct URL and body
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);

      // Flush the request to return the expected response
      req.flush(expectedResponse);

      
    });
  });
  describe('accountToWallet', () => {
    it('should make a POST request to the correct URL with the correct body', () => {
      const userId = 123;
      const accountId = 456;
      const amount = 789;
      const expectedUrl = `${service.apiRoot}Transaction/transaction/internal?type=4`;
      const expectedBody = { recipientId: userId, accountId, amount };

      // Mock the response from the API
      const expectedResponse = { success: true };
      // Call the function and subscribe to the result
      let result;
      service.accountToWallet(accountId, userId, amount).subscribe(res => {
        expect(res).toEqual(expectedResponse);
      });

      // Expect that a POST request was made with the correct URL and body
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);

      // Flush the request to return the expected response
      req.flush(expectedResponse);

      
    });
  });
  describe('walletToAccount', () => {
    it('should make a POST request to the correct URL with the correct body', () => {
      const accountId = 123;
      const userId = 456;
      const amount = 789;
      const expectedUrl = `${service.apiRoot}Transaction/transaction/internal?type=1`;
      const expectedBody = { accountId, senderId: userId, amount };

      // Mock the response from the API
      const expectedResponse = { success: true };
      // Call the function and subscribe to the result
      let result;
      service.walletToAccount(userId, accountId, amount).subscribe(res => {
        expect(res).toEqual(expectedResponse);
      });

      // Expect that a POST request was made with the correct URL and body
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedBody);

      // Flush the request to return the expected response
      req.flush(expectedResponse);

      
    });
  });
});