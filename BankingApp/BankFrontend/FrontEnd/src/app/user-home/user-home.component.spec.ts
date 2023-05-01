import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';

import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;
  let httpMock: HttpClientTestingModule;


  beforeEach(async () => {
    const jwtDecoderSpy = jasmine.createSpyObj('JwtDecoderService', ['decodeToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getWalletBalance']);
    userDataServiceSpy.getWalletBalance.and.returnValue(of({ wallet: 100 }));
    
    await TestBed.configureTestingModule({
      declarations: [ UserHomeComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        { provide: JwtDecoderService, useValue: jwtDecoderSpy },
        { provide: UserDataService, useValue: userDataServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeComponent);
    httpMock = TestBed.inject(HttpClientTestingModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
