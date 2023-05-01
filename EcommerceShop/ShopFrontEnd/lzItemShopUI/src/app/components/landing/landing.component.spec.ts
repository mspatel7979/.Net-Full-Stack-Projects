import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { LzisApiService } from 'src/app/lzis-api.service';
import { ItemCacheService } from 'src/app/item-cache.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/models/user';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let api : LzisApiService
  let cache : ItemCacheService
  let httpMock : HttpTestingController
  let apiRoot = 'http://localhost:5070/';
  const user : User = {
    userID: 1,
    username: 'random',
    password: 'random1234',
    zeldaCharacter: 'Zelda',
    coinBank: 100,
    clickPower: 20,
    charZelda: true
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LandingComponent
      ],
      imports : [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: 'in', component: LandingComponent}]),
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    api = TestBed.inject(LzisApiService)
    cache = TestBed.inject(ItemCacheService)
    httpMock = TestBed.inject(HttpTestingController)

    component = fixture.componentInstance;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.userForm.controls['username'].value).toBe('')
    expect(component.userForm.controls['password'].value).toBe('')
    expect(cache.user.userID).toBe(0)
    expect(cache.user.username).toBe('')
    expect(cache.user.password).toBe('')
    expect(cache.user.zeldaCharacter).toBe('true')
    expect(cache.user.coinBank).toBe(0)
    expect(cache.user.clickPower).toBe(1)
  })

  it('should log in', () => {
    const event = new SubmitEvent('submit');
    let user = {
      userID : 1,
      username : 'alice',
      password : 'alice1234',
      zeldaCharacter : 'true',
      coinBank : 1,
      clickPower : 1
    };
    spyOn(api, 'userLogIn').and.returnValue(of(user));
    spyOn(component.userForm, 'markAsTouched')
    
    component.userForm.controls['username'].setValue('alice')
    component.userForm.controls['password'].setValue('alice1234')
    component.onLogin(event);
  });
  it('should not login', () => {
    const event = new SubmitEvent('submit');
    component.onLogin(event);
  })

  it('should register user', () => {
    const event = new SubmitEvent('submit');
    let user = {
      userID : 1,
      username : 'alice',
      password : 'alice1234',
      zeldaCharacter : 'true',
      coinBank : 1,
      clickPower : 1
    };
    spyOn(api, 'userRegister').and.returnValue(of(user));
    spyOn(component.userForm, 'markAsTouched')
    
    component.userForm.controls['username'].setValue('alice')
    component.userForm.controls['password'].setValue('alice1234')

    component.onRegister(event)
    expect(component.userForm.valid).toBeTrue()
    expect(cache.user.username).toBe('alice')
    expect(cache.user.password).toBe('alice1234')
    expect(api.userRegister).toHaveBeenCalled()
  })

  it('should not register if user form is not valid', () => {
    const event = new SubmitEvent('submit');
    spyOn(api, 'userLogIn')

    component.onRegister(event)
    expect(component.userForm.valid).toBeFalse()
  })

});
function MockInstance() {
  throw new Error('Function not implemented.');
}

