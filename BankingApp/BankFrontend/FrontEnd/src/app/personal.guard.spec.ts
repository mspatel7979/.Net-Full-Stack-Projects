import { PersonalGuard } from './personal.guard';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

describe('PersonalGuard', () => {
  let guard: PersonalGuard;
  let router: Router;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [PersonalGuard, CookieService]
    });
    guard = TestBed.inject(PersonalGuard);
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
  });

  it('should allow access if user is of type Personal and has an Id', () => {
    spyOn(TestBed.inject(CookieService), 'get').and.callFake((key: string) => {
      switch (key) {
        case 'userType':
          return 'Personal';
        case 'Id':
          return '1';
        default:
          return '';
      }
    });
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(guard.canActivate(route, state)).toEqual(false);
  });

  it('should not allow access if user is not of type Personal', () => {
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
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(router, 'navigate');
    expect(guard.canActivate(route, state)).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not allow access if user does not have an Id', () => {
    spyOn(TestBed.inject(CookieService), 'get').and.callFake((key: string) => {
      switch (key) {
        case 'userType':
          return 'Personal';
        case 'Id':
          return '';
        default:
          return '';
      }
    });
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    spyOn(router, 'navigate');
    expect(guard.canActivate(route, state)).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});