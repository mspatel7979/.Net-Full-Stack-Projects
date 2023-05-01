import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LzisApiService } from 'src/app/lzis-api.service';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemCacheService } from 'src/app/item-cache.service';
import { isEmpty, of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: LzisApiService;
  let cache: ItemCacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    cache = TestBed.inject(ItemCacheService);
    service = TestBed.inject(LzisApiService);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should exit cart to false', () => {
    cache.viewCart = true;
    component.exitCart();
    expect(cache.viewCart).toBeFalse();
  });
  it('should ngonInit', () => {
    cache.user.userID = 1;
    cache.loggedIn = true;
    component.viewCart = false;
    component.ngOnInit();
    cache.ItemShop = [{
      productID : 3,
      name : 'test',
      description : "test",
      price : 100,
      powerIncrease : 2,
      upgradesTotal : 1,
      img : 'url'
    }];
    cache.Cart = [{
          productID : 1,
          name : 'test',
          description : "test",
          price : 100,
          powerIncrease : 2,
          upgradesTotal : 1,
          img : 'url'
        },{
        productID : 2,
        name : 'test',
        description : "test",
        price : 100,
        powerIncrease : 1,
        upgradesTotal : 1,
        img : 'url'
      }];
    expect(cache.Cart).toHaveSize(2);
    component.itemCart = cache.Cart;
    expect(component.itemCart).toEqual(cache.Cart);
    component.removeItem(1);
    expect(cache.Cart).toHaveSize(1);
    expect(cache.ItemShop).toHaveSize(2);
  });
  it('should remove', () => {
    cache.ItemShop = [{
      productID : 3,
      name : 'test',
      description : "test",
      price : 100,
      powerIncrease : 2,
      upgradesTotal : 1,
      img : 'url'
    }];
    cache.Cart = [{
          productID : 1,
          name : 'test',
          description : "test",
          price : 100,
          powerIncrease : 2,
          upgradesTotal : 1,
          img : 'url'
        },{
        productID : 2,
        name : 'test',
        description : "test",
        price : 100,
        powerIncrease : 1,
        upgradesTotal : 1,
        img : 'url'
      }];
    expect(cache.Cart).toHaveSize(2);
    component.removeItem(1);
    expect(cache.Cart).toHaveSize(1);
    expect(cache.ItemShop).toHaveSize(2);
  });
  it('should checkout', () => {
    cache.user.userID = 1;
    cache.Cart = [{
      productID : 1,
      name : 'test',
      description : "test",
      price : 100,
      powerIncrease : 2,
      upgradesTotal : 1,
      img : 'url'
    },
    {
      productID : 2,
      name : 'test',
      description : "test",
      price : 100,
      powerIncrease : 1,
      upgradesTotal : 1,
      img : 'url'
    }];
    component.checkout();
    cache.user.coinBank = 3000;
    let addedMoney = 0;
      for(let item of cache.Cart) {
        addedMoney += item.price;
      }
  });
});