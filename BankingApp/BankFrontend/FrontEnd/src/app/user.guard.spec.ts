import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserGuard } from './user.guard';
import { CookieService } from 'ngx-cookie-service';

describe('UserGuard', () => {
  let guard: UserGuard;
  let router: Router;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserGuard, { provide: CookieService, useValue: spy }]
    });
    guard = TestBed.inject(UserGuard);
    router = TestBed.inject(Router);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if Id is set', () => {
    cookieServiceSpy.get.and.returnValue('1');
    spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to Home if Id is not set', () => {
    cookieServiceSpy.get.and.returnValue('');
    spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});