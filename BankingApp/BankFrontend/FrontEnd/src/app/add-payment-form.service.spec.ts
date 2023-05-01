import { TestBed } from '@angular/core/testing';
import { PaymentFormService } from "./add-payment-form.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Card } from './Interfaces/Card';
import { Account } from './Interfaces/Account';


describe("PaymentFormService", () => {
  let service: PaymentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,]
    });
    service = TestBed.inject(PaymentFormService);
  });

  it('should PaymentFormService', () => {
    expect(service).toBeTruthy();
  });
  it('should observe add Card', () => {
    const tempCard = {
      id: 1,
      CardNumber: 1111111111111111,
      UserId: 1,
      BusinessId1: 1,
      ExpiryDate : new Date,
      Cvv: 111,
      Balance: 100
    };
    let newCard = {};
    spyOn(service, 'addCard').and.returnValue(of(tempCard));
    service.addCard(tempCard).subscribe(data => newCard = data);
    expect(newCard).toEqual(tempCard);
    
  });
  it('should observe add Account', () => {
    const tempAccount = {
      id: 1,
      AccountNumber : "1111111111111",
      RoutingNumber : "2345678345",
      UserId : 1,
      BusinessId: 1,
      Balance: 100
    };
    let newAccount = {};
    spyOn(service, 'addAccount').and.returnValue(of(tempAccount));
    service.addAccount(tempAccount).subscribe(data => newAccount = data);
    expect(newAccount).toEqual(tempAccount);
  });
});
