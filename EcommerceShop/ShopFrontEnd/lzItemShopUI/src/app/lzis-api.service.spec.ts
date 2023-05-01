import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LzisApiService } from './lzis-api.service';
import { User } from './models/user';
import { ItemCacheService } from './item-cache.service';
import { Item } from './models/item';

describe('LzisApiService', () => {
  let service: LzisApiService;
  let httpMock: HttpTestingController;
  let cache: ItemCacheService;
  
  const user : User = {
    userID: 1,
    username: 'random',
    password: 'random1234',
    zeldaCharacter: 'Zelda',
    coinBank: 100,
    clickPower: 20,
    charZelda: true
  };

  const cart : Array<Item> = [
    {
      "productID": 71,
      "name": "forest dweller's bow",
      "description": "The Koroks made this bow for Hylians. It's crafted from flexible wood and uses sturdy vines for the bowstring. Its construction may be simple, but it fires multiple arrows at once.",
      "price": 2970,
      "powerIncrease": 15,
      "upgradesTotal": 0,
      "img" : ""
    },
    {
      "productID": 72,
      "name": "silver bow",
      "description": "A bow favored by the Zora for fishing. It doesn't boast the highest firepower, but the special metal it's crafted from prioritizes durability.",
      "price": 2970,
      "powerIncrease": 15,
      "upgradesTotal": 0,
      "img" : ""
    }
  ]
  
  //let apiRoot = 'http://localhost:5070/';
  let apiRoot  = 'https://lzitest.azurewebsites.net/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LzisApiService);
    cache = TestBed.inject(ItemCacheService);
    httpMock = TestBed.inject(HttpTestingController);

    cache.user = user
    cache.Cart = cart
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default external api url', () => {
    expect(service.apiRoot).toBe(apiRoot)
  });

  it('should allow user to login', () => {
    service.userLogIn(user).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.username).toBe('random')
      expect(data.password).toBe('random1234')
      expect(data.charZelda).toBeTrue()
      expect(data.userID).toBe(1)
      expect(data.coinBank).toBe(100)
      expect(data.clickPower).toBe(20)
      expect(data.zeldaCharacter).toBe('Zelda')
    })

    const req = httpMock.expectOne(apiRoot + 'User/Login?username=random&password=random1234');
    expect(req.request.method).toBe('GET')

    req.flush(user)

    httpMock.verify();
  })

  it('should allow user to register', () => {

    service.userRegister(user).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.userID).toBe(1)
    })

    const req = httpMock.expectOne(apiRoot + 'User/Register')
    expect(req.request.method).toBe('POST')

    httpMock.verify();
  })

  it('should get user item shop', () => {
    service.getItemShop(user.userID? user.userID : -1).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(3)
    })
    const req = httpMock.expectOne(apiRoot + 'Inventory/UnOwn/List?u_id=1')
    expect(req.request.method).toBe('GET')

    req.flush([
      {
        "productID": 71,
        "name": "forest dweller's bow",
        "description": "The Koroks made this bow for Hylians. It's crafted from flexible wood and uses sturdy vines for the bowstring. Its construction may be simple, but it fires multiple arrows at once.",
        "price": 2970,
        "powerIncrease": 15,
        "upgradeTotal": 0
      },
      {
        "productID": 72,
        "name": "silver bow",
        "description": "A bow favored by the Zora for fishing. It doesn't boast the highest firepower, but the special metal it's crafted from prioritizes durability.",
        "price": 2970,
        "powerIncrease": 15,
        "upgradeTotal": 0
      },
      {
        "productID": 73,
        "name": "vicious sickle",
        "description": "A grim weapon favored by the Yiga. The half-moon shape of the blade allows for the rapid delivery of fatal wounds and serves as a symbol of their terror. Its durability is low.",
        "price": 3168,
        "powerIncrease": 16,
        "upgradeTotal": 0
      }
    ])

    httpMock.verify();

  })

  it('should get user cart', () => {
    service.getCart(user.userID? user.userID : -1).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(2)
    })
    const req = httpMock.expectOne(apiRoot + 'Cart/User?u_id=1')
    expect(req.request.method).toBe('GET')

    req.flush([
      {
        "productID": 71,
        "name": "forest dweller's bow",
        "description": "The Koroks made this bow for Hylians. It's crafted from flexible wood and uses sturdy vines for the bowstring. Its construction may be simple, but it fires multiple arrows at once.",
        "price": 2970,
        "powerIncrease": 15,
        "upgradeTotal": 0
      },
      {
        "productID": 72,
        "name": "silver bow",
        "description": "A bow favored by the Zora for fishing. It doesn't boast the highest firepower, but the special metal it's crafted from prioritizes durability.",
        "price": 2970,
        "powerIncrease": 15,
        "upgradeTotal": 0
      }
    ])

    httpMock.verify();

  })

  it('should get user inventory', () => {
    service.getInventory(user.userID? user.userID : -1).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(1)
    })
    const req = httpMock.expectOne(apiRoot + 'Inventory/Own/List?u_id=1')
    expect(req.request.method).toBe('GET')

    req.flush([
      {
        "productID": 71,
        "name": "forest dweller's bow",
        "description": "The Koroks made this bow for Hylians. It's crafted from flexible wood and uses sturdy vines for the bowstring. Its construction may be simple, but it fires multiple arrows at once.",
        "price": 2970,
        "powerIncrease": 15,
        "upgradeTotal": 0
      }
    ])

    httpMock.verify();

  })

  it('should add item to user cart', () => {
    // cache.user = user
    service.addToCart(72)

    const req = httpMock.expectOne(apiRoot + 'Cart/Product/Add')
    expect(req.request.method).toBe('POST')

    httpMock.verify()
  })

  it('should checkout cart', () => {

    expect(cache.Cart.length).toBe(2)
    service.checkout(user.userID? user.userID : -1)
    const req = httpMock.match(apiRoot + 'Inventory/Own/List/Add/Product')
    const req2 = httpMock.match(apiRoot + 'Cart/Product/Delete')
    expect(user.userID).toBe(cache.user.userID)

    httpMock.verify()
  })

  it('should delete from user cart', () => {
    expect(cache.Cart.length).toBe(2)
    service.deleteItemFromCart(71)

    expect(cache.user).toBe(user)
    const req = httpMock.expectOne(apiRoot + 'Cart/Product/Delete')
    expect(req.request.method).toBe('DELETE')

    httpMock.verify();
  })

  it('should update user information', () => {

    service.updateUser()
    const req = httpMock.expectOne(apiRoot + 'User/Update/Coins')
    expect(req.request.method).toBe('PUT')

    const req2 = httpMock.expectOne(apiRoot + 'User/Update/Power')
    expect(req2.request.method).toBe('PUT')

    req.flush(user)
    req2.flush(user)

    httpMock.verify()
  })

});
