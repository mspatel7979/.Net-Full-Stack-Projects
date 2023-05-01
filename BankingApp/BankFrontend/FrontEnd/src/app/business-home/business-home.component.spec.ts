import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';
import { BusinessHomeComponent } from './business-home.component';
import { AuthService} from '../auth.service';

describe('BusinessHomeComponent', () => {
  let component: BusinessHomeComponent;
  let fixture: ComponentFixture<BusinessHomeComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;

  beforeEach(async () => {
    const jwtDecoderSpy = jasmine.createSpyObj('JwtDecoderService', ['decodeToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getWalletBalance']);
    userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: 100 }));
    
    await TestBed.configureTestingModule({
      declarations: [BusinessHomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        CookieService,
        { provide: JwtDecoderService, useValue: jwtDecoderSpy },
        { provide: UserDataService, useValue: userDataServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWalletAmount and set _wallet to the response data', () => {
    const id = 123;
    component.getWalletAmount(id);
    expect(userDataServiceSpy.getWalletBalance).toHaveBeenCalledWith(id);
    expect(component._wallet).toEqual(100);
  });

  it('should set email and Id properties from cookie', () => {
    spyOn(component.cookieService, 'get').and.returnValues('test@test.com', '123');
    component.ngOnInit();
    expect(component.userData.email).toEqual('test@test.com');
    expect(component.userData.Id).toEqual('123');
  });
});
