import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { LandingComponent } from './Landing.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);


  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      providers : [
        CookieService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
