import { TestBed } from '@angular/core/testing';
import { Item } from './models/item';
import { User } from './models/user';
import { ItemCacheService } from './item-cache.service';

describe('ItemCacheService', () => {
  let service: ItemCacheService;
  const user : User = {
    userID: 9,
    username: "alice",
    password: "alice1234",
    zeldaCharacter: "Zelda",
    coinBank: 1001,
    clickPower: 51,
    charZelda: true
  }
  const item : Item = {
    "productID": 71,
    "name": "forest dweller's bow",
    "description": "The Koroks made this bow for Hylians. It's crafted from flexible wood and uses sturdy vines for the bowstring. Its construction may be simple, but it fires multiple arrows at once.",
    "price": 2970,
    "powerIncrease": 15,
    "upgradesTotal": 0,
    "img" : ""
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear cache', () => {
    service.clearCache()
    expect(service.loggedIn).toBeFalse()
    expect(service.user).toEqual({})
    expect(service.ItemShop.length).toBe(0)
    expect(service.Inventory.length).toBe(0)
    expect(service.Cart.length).toBe(0)
  })

  it('should populate cache data', () => {
    service.fillCache(user, [item, item], [item], [item, item, item])

    expect(service.ItemShop.length).toBe(2)
    expect(service.Inventory.length).toBe(1)
    expect(service.Cart.length).toBe(3)
    expect(service.user).toBe(user)
    expect(service.loggedIn).toBeTrue()
  })

  it('should update cache cart', () => {
    service.updateCart(item)
    service.updateCart(item)
    service.updateCart(item)

    expect(service.Cart.length).toBe(3)
  })
});
