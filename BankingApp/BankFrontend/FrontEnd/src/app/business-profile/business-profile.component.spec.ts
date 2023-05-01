import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileComponent } from './business-profile.component';
import { CookieService } from 'ngx-cookie-service';
import { UserDataService } from '../user-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


describe('BusinessProfileComponent', () => {
  let component: BusinessProfileComponent;
  let fixture: ComponentFixture<BusinessProfileComponent>;
  let uds : UserDataService;
  let cookie : CookieService;
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessProfileComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    cookie = TestBed.inject(CookieService);
    uds = TestBed.inject(UserDataService);
    fixture = TestBed.createComponent(BusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Get Business User Email and ID', () => {
    cookie.set('userType', 'Business');
    cookie.set('email', 'test@email.com');
    spyOn(uds, 'retrieveBusinessIdFromDB').and.returnValue(of(1));
    component.busObj = [{},{}];
    spyOn(uds, 'getFullBusinessUser').and.returnValue(of(component.busObj));
    component.ngOnInit();
  });

  it('should navigate to business home on exit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.exit(new Event('click'));
    expect(navigateSpy).toHaveBeenCalledWith(['/BusinessHome']);
  });
  
  it('should update business profile on save', () => {
    let tempObj = [{},{}];
    const updateSpy = spyOn(uds, 'updateBusinessProfile').and.returnValue(of(tempObj));
    const navigateSpy = spyOn(router, 'navigate');
    component.busObj = [{ businessName: 'Test Business', address: '123 Main St', bin: '987654321', businessType: 'Retail', username: 'testuser' }];
    component.businessName = 'New Business Name';
    component.address = '456 Elm St';
    component.bin = '123456789';
    component.busType = 'Wholesale';
    component.saveProfile(new Event('click'));
    expect(updateSpy).toHaveBeenCalledWith({
      businessName: 'New Business Name',
      
      address: '456 Elm St',
      bin: '123456789',
      businessType: 'Wholesale',
      username: 'testuser',
  });
    
  expect(navigateSpy).toHaveBeenCalledWith(['/BusinessHome']);
  });
  
});
