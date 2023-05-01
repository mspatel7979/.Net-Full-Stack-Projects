import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViewAllTransactionsComponent } from './view-all-transactions.component';
import { UserDataService } from '../user-data.service';
import { of } from 'rxjs';

describe('ViewAllTransactionsComponent', () => {
  let component: ViewAllTransactionsComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<ViewAllTransactionsComponent>;
  let userApi: UserDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllTransactionsComponent],
      imports: [
        HttpClientTestingModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewAllTransactionsComponent);
    userApi = TestBed.inject(UserDataService);
    httpMock = TestBed.inject(HttpTestingController)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', async () => {
    expect(component.Transactions).toEqual([])
    expect(component.user).toEqual('' || undefined)

    spyOn(component, 'ngOnInit')
    component.ngOnInit()

    expect(component.ngOnInit).toHaveBeenCalled()

    httpMock.expectOne('https://wiz-back.azurewebsites.net/user/byEmail/test@email.com')


    // expect(userApi.getUser).toHaveBeenCalled()
  })
});
