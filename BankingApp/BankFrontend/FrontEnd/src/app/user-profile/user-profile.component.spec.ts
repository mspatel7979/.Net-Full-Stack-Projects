import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let router : Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserDataService', ['getUser', 'retrieveUserIdFromDB', 'getFullPersonalUser', 'updateUserProfile']);
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get']);

    TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports: [ RouterTestingModule.withRoutes(
        [{path: 'UserHome', component: UserHomeComponent}]
      ) ],
      providers: [
        { provide: UserDataService, useValue: spy },
        { provide: CookieService, useValue: cookieSpy }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userDataServiceSpy = TestBed.inject(UserDataService) as jasmine.SpyObj<UserDataService>;
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create UserProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('onKey', () => {
    it('should set name property when called with name field', () => {
      component.onKey({ target: { value: 'John Doe' } }, 'name');
      expect(component.name).toEqual('John Doe');
    });

    it('should set address property when called with address field', () => {
      component.onKey({ target: { value: '123 Main St' } }, 'address');
      expect(component.address).toEqual('123 Main St');
    });
  });

  it('should retrieve user data from UserDataService on init', () => {
    const email = 'test@example.com';
    const userId = 123;
    const userObj = {
      fullName: 'Test User',
      address: '123 Test Street',
      username: 'testuser'
    };
    cookieServiceSpy.get.and.returnValue(email);
    userDataServiceSpy.getUser.and.returnValue(email);
    userDataServiceSpy.retrieveUserIdFromDB.and.returnValue(of(userId));
    userDataServiceSpy.getFullPersonalUser.and.returnValue(of([userObj]));

    fixture.detectChanges();


    expect(cookieServiceSpy.get).toHaveBeenCalledWith('email');
    expect(userDataServiceSpy.getUser).toHaveBeenCalledWith();
    expect(userDataServiceSpy.retrieveUserIdFromDB).toHaveBeenCalledWith(email);
    expect(userDataServiceSpy.getFullPersonalUser).toHaveBeenCalledWith(userId);
    expect(component.userObj).toEqual([userObj]);
  });

  it('should update user profile data using UserDataService', () => {
    const userObj = {
      fullName: 'Test User',
      address: '123 Test Street',
      username: 'testuser'
    };
    const updatedName = 'Updated Name';
    const updatedAddress = '456 Updated Street';
    component.userObj = userObj;
    component.name = updatedName;
    component.address = updatedAddress;
    userDataServiceSpy.updateUserProfile.and.returnValue(of(['success']));

    component.saveProfile(new Event('click'));

    expect(userDataServiceSpy.updateUserProfile).toHaveBeenCalledWith(userObj);
  });

  it('should navigate to UserHome after saving or exiting profile', () => {
    const router = TestBed.inject(Router);
  });

  describe('exit', () => {
    it('should navigate to UserHome', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      component.exit(new Event('click'));
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/UserHome']);
    });
  });

});
