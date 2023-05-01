import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferPageComponent } from './transfer-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { of,Observable} from 'rxjs';

describe('TransferPageComponent', () => {
  let component: TransferPageComponent;
  let fixture: ComponentFixture<TransferPageComponent>;
  let transferServiceSpy: jasmine.SpyObj<TransferService>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;


  beforeEach(async () => {
    transferServiceSpy = jasmine.createSpyObj('TransferService', ['walletToCard', 'walletToAccount']);
    userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getUserCards', 'getUserAccounts', 'getWalletBalance']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);


    await TestBed.configureTestingModule({
      declarations: [ TransferPageComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TransferService,
        UserDataService,
        { provide: TransferService, useValue: transferServiceSpy },
        { provide: UserDataService, useValue: userDataServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('processCardForm', () => {
    it('should call walletToCard if wallet balance is greater than or equal to card amount', () => {
      // arrange
      const testAmount = 50;
      const testCardId = 1234;
      const walletSpy = userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: testAmount }));
      const walletToCardSpy = transferServiceSpy.walletToCard.and.returnValue(of({ amount: testAmount }));

      component.selected = testCardId.toString();
      component.cardForm.patchValue({ cardAmount: testAmount });

      // act
      component.processCardForm(new Event('click'));

      // assert
      expect(walletSpy).toHaveBeenCalledWith(component.UID);
      expect(walletToCardSpy).toHaveBeenCalledWith(component.UID, testCardId, testAmount);
      expect(component.transaction.toString()).toEqual(testAmount.toString());
    });

    it('should not call walletToCard if wallet balance is less than card amount', () => {
      // arrange
      const testAmount = 100;
      const testCardId = 5678;
      const walletSpy = userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: testAmount }));
      const walletToCardSpy = transferServiceSpy.walletToCard.and.returnValue(of({ amount: testAmount }));
      const alertSpy = spyOn(window, 'alert');

      component.selected = testCardId.toString();
      component.cardForm.patchValue({ cardAmount: testAmount + 1 });

      // act
      component.processCardForm(new Event('click'));

      // assert
      expect(walletSpy).toHaveBeenCalledWith(component.UID);
      expect(walletToCardSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Not enough money');
      expect(component.transaction).toBeUndefined();
    });

    it('should not call walletToCard if card form is invalid', () => {
      // arrange
      const testAmount = 100;
      const testCardId = 5678;
      const walletSpy = userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: testAmount }));
      const walletToCardSpy = transferServiceSpy.walletToCard.and.returnValue(of({ amount: testAmount }));

      component.selected = testCardId.toString();
      component.cardForm.patchValue({});

      // act
      component.processCardForm(new Event('click'));

      // assert
      expect(walletSpy).not.toHaveBeenCalled();
      expect(walletToCardSpy).not.toHaveBeenCalled();
      expect(component.transaction).toBeUndefined();
    });
  });


  it('should process bank form correctly', async () => {
    // set up test data
    const formValue = { bankAmount: 100 };
    const selectedAccount = '1234';
    component.selected = selectedAccount;
  
    // mock getUserAccounts to return test data
    userDataServiceSpy.getUserAccounts.and.returnValue(of([{ id: 1234, name: 'Account 1' }]));
  
    // mock getWalletBalance to return wallet balance of 200
    userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: 200 }));
  
    // mock walletToAccount to return a transaction object
    const mockTransaction = { amount: 100 };
    transferServiceSpy.walletToAccount.and.returnValue(of(mockTransaction));
  
    // submit bank form
    component.bankForm.setValue(formValue);
    await component.processBankForm(new Event('submit'));
  
    // check that walletToAccount was called with correct parameters
    expect(transferServiceSpy.walletToAccount).toHaveBeenCalledWith(component.UID, parseInt(selectedAccount), formValue.bankAmount);
  });

  

});

