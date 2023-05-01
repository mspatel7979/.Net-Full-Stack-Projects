import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './navbar.component';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const jwtDecoderSpy = jasmine.createSpyObj('JwtDecoderService', ['decodeToken']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
  const userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['getWalletBalance']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers : [
        CookieService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: JwtDecoderService, useValue: jwtDecoderSpy },
        { provide: UserDataService, useValue: userDataServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
