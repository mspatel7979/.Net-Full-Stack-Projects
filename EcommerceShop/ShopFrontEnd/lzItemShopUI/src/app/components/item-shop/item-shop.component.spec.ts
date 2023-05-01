import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemShopComponent } from './item-shop.component';
import { LzisApiService } from 'src/app/lzis-api.service';
import { ItemCacheService } from 'src/app/item-cache.service';
import { of } from 'rxjs'

describe('ItemShopComponent', () => {
  let component: ItemShopComponent;
  let fixture: ComponentFixture<ItemShopComponent>;
  let service: LzisApiService;
  let cache: ItemCacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemShopComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    cache = TestBed.inject(ItemCacheService);
    service = TestBed.inject(LzisApiService);
    fixture = TestBed.createComponent(ItemShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngoninit', () => {
    cache.loggedIn = true;
    cache.user.userID = 1;
    let item = [{
      productID : 4,
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
      powerIncrease : 3,
      upgradesTotal : 1,
      img : 'url'}];
    spyOn(service, 'getItemShop').and.returnValue(of(item));
    component.ngOnInit();
  })
  it('should getimage string', () => {
    let apiItem = {
      data : {
        attack : 1,
        category : 'teststring',
        common_locations : [{}],
        defense: 1,
        description : 'test',
        id : 1,
        image : 'url',
        name : 'name'
      }
    }
    spyOn(service, 'getimage').and.returnValue(of(apiItem));
    component.getItemImage('uname');
  });
  it('should add to cart', () => {
    cache.Cart = [{
      productID : 4,
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
      powerIncrease : 3,
      upgradesTotal : 1,
      img : 'url'
    }];
    let itemID = 3;
    component.addToCart(itemID);

  });
});