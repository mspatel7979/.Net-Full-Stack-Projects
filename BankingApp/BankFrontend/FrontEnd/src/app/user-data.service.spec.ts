import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDataService]
    });

    service = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user id from DB', () => {
    const dummyUserId = 12345;

    service.retrieveUserIdFromDB('test@example.com').subscribe(userId => {
      expect(userId).toEqual(dummyUserId);
    });

    const req = httpMock.expectOne(`https://wiz-back.azurewebsites.net/user/byEmail/test@example.com`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserId);
  });

  it('should retrieve business id from DB', () => {
    const dummyBusinessId = 67890;

    service.retrieveBusinessIdFromDB('test@example.com').subscribe(businessId => {
      expect(businessId).toEqual(dummyBusinessId);
    });

    const req = httpMock.expectOne(`https://wiz-back.azurewebsites.net/Business/busId/test@example.com`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBusinessId);
  });

  it('should retrieve business type from DB', () => {
    const dummyBusinessType = 'small_business';

    service.retrieveBusinessTypeFromDB('test@example.com').subscribe(businessType => {
      expect(businessType).toEqual(dummyBusinessType);
    });

    const req = httpMock.expectOne(`https://wiz-back.azurewebsites.net/Business/busType/test@example.com`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBusinessType);
  });

  it('should retrieve user cards', () => {
    const dummyUserId = 12345;
    const dummyUserCards = [
      { id: 1, name: 'Card 1' },
      { id: 2, name: 'Card 2' }
    ];

    service.getUserCards(dummyUserId).subscribe(userCards => {
      expect(userCards).toEqual(dummyUserCards);
    });

    const req = httpMock.expectOne(`https://wiz-back.azurewebsites.net/Card/User?userId=${dummyUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserCards);
  });

  it('should retrieve user accounts', () => {
    const dummyUserId = 12345;
    const dummyUserAccounts = [
      { id: 1, name: 'Account 1' },
      { id: 2, name: 'Account 2' }
    ];

    service.getUserAccounts(dummyUserId).subscribe(userAccounts => {
      expect(userAccounts).toEqual(dummyUserAccounts);
    });

    const req = httpMock.expectOne(`https://wiz-back.azurewebsites.net/Account/UserAccounts?id=${dummyUserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserAccounts);
  });
});