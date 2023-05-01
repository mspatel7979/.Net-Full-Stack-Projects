import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemCacheService } from 'src/app/item-cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LzisApiService } from 'src/app/lzis-api.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let cache : ItemCacheService
  let router : Router
  let api : LzisApiService
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
        NavbarComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.inject(Router)
    cache = TestBed.inject(ItemCacheService);
    api = TestBed.inject(LzisApiService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should log out', () => {
    const spy = spyOn(api, 'updateUser');
    cache.user = user
    expect(cache.user).toEqual(user)
    component.logOut()
    
    expect(api.updateUser).toHaveBeenCalled()
    expect(cache.user).toEqual({})
    // const spy2 = spyOn(router, '')
  })

  it('should toggle cart', () => {
    cache.viewCart = false;
    component.toggleCart()
    expect(cache.viewCart).toBeTrue()
    component.toggleCart()
    expect(cache.viewCart).toBeFalse()
  })
});
