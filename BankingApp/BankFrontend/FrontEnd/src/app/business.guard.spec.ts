import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { BusinessGuard } from './business.guard';
import { Router } from '@angular/router';

describe('BusinessGuard', () => {
  let guard: BusinessGuard;
  let cookieService: CookieService;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CookieService]
    });
    guard = TestBed.inject(BusinessGuard);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should allow access to business page if user is a business', () => {
    spyOn(TestBed.inject(CookieService), 'get').and.callFake((key: string) => {
      switch (key) {
        case 'userType':
          return 'Business';
        case 'Id':
          return '1';
        default:
          return '';
      }
    });
    const canActivate = guard.canActivate(null, null);
    expect(canActivate).toBeFalse();
  });

  it('should not allow access to business page if user is not a business', () => {
    spyOn(cookieService, 'get').and.returnValue('Individual');
    spyOn(router, 'navigate');
    const canActivate = guard.canActivate(null, null);
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});