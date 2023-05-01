import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferMoneyComponent } from './transfer-money.component';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

describe('TransferMoneyComponent', () => {
  let component: TransferMoneyComponent;
  let fixture: ComponentFixture<TransferMoneyComponent>;
  let mockTransferService: any;
  let mockUserDataService : any;
  let mockRouter : any;
  let mockCookieService : any;

  beforeEach(async () => {
    mockTransferService = jasmine.createSpyObj(['accountToWallet', 'cardToWallet']);
    mockUserDataService = jasmine.createSpyObj(['getUserCards', 'getUserAccounts']);
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);
    mockCookieService = jasmine.createSpyObj(['get']);

    await TestBed.configureTestingModule({
      declarations: [TransferMoneyComponent],
      providers: [
        { provide: TransferService, useValue: mockTransferService },
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookieService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set type, cardDisplay, bankDisplay, and UID in ngOnInit', () => {
    spyOn(component, 'setType');
    spyOn(component, 'displayAccounts');
    spyOn(component, 'displayCards');
    mockCookieService.get.and.returnValue('1');

    component.ngOnInit();

    expect(component.type).toEqual('c');
    expect(component.cardDsiplay).toEqual(true);
    expect(component.bankDisplay).toEqual(false);
    expect(component.UID).toEqual(1);
    expect(component.setType).toHaveBeenCalledWith('c');
    expect(component.displayAccounts).toHaveBeenCalledWith(1);
    expect(component.displayCards).toHaveBeenCalledWith(1);
  });

  it('should call the appropriate service method to transfer money from bank to wallet when the type is bank', () => {
    // arrange
    component.type = 'b';
    component.typeId = 1;
    component.UID = 2;
    component._amount = 10;
    const mockResponse = { success: true };
    
    // act
    component.addMoney();
  
    // assert
    expect(component.service.accountToWallet).toHaveBeenCalledWith(1, 2, 10);
    expect(component.messagecall).toBe(false);
    expect(component.message).toBe('this message');
  });
  
  it('should populate cardList with user cards', () => {
    
    const userId = 1;
    const userCards = [
      { id: 1, balance: 100, cardNumber: '1234567890123456', cvv: 123, expiryDate: '10/23' },
      { id: 2, balance: 50, cardNumber: '2345678901234567', cvv: 456, expiryDate: '12/24' }
    ];
    const expectedCardList = [
      { cardId: 1, balance: 100, cardNumber: '1234567890123456', cvv: 123, expDate: '10/23' },
      { cardId: 2, balance: 50, cardNumber: '2345678901234567', cvv: 456, expDate: '12/24' }
    ];
    const getUserCardsSpy = mockUserDataService.getUserCards.and.returnValue(of(userCards));
    
    component.displayCards(userId);

    expect(getUserCardsSpy).toBeNaN;
    expect(getUserCardsSpy).toHaveBeenCalled();
    expect(component.cardList[0].cardId).toBe(userCards[0].id);
 


  });


  it('should populate bankList with user accounts', () => {
    // Set up mock data
  
  const userId = 1;
  const UserAccounts = [
    {acctNum: '1234567890', routingNum: 123454, balance: 1000, bankAcctId: 1},
    {acctNum: '0987654321', routingNum: 123454, balance: 2000, bankAcctId: 2}
  ];
  const expectedUserAccounts = [
    {acctNum: '1234567890', routingNum: 123454, balance: 1000, bankAcctId: 1},
    {acctNum: '0987654321', routingNum: 123454, balance: 2000, bankAcctId: 2}
  ];

      // Call the displayAccounts method
      component.displayAccounts(1);

  const getUserAccountsSpy = mockUserDataService.getUserAccounts.and.returnValue(of(UserAccounts));
  
  component.displayCards(userId);

  expect(getUserAccountsSpy).toBeNaN;
  expect(getUserAccountsSpy).toHaveBeenCalled();
  })
  
});
