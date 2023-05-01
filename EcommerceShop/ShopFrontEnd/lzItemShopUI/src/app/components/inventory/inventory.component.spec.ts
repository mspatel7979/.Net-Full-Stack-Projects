import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryComponent } from './inventory.component';
import { LzisApiService } from 'src/app/lzis-api.service';
import { ItemCacheService } from 'src/app/item-cache.service';
import { isEmpty, of } from 'rxjs';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let service: LzisApiService;
  let cache: ItemCacheService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    cache = TestBed.inject(ItemCacheService);
    service = TestBed.inject(LzisApiService);
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngoninit', () => {
    cache.loggedIn = true;
    expect(cache.loggedIn).toBeTruthy();
    cache.user.userID = 1;
    let item1 = [{
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
      cache.Inventory =[{
        productID : 5,
        name : 'test',
        description : "test",
        price : 100,
        powerIncrease : 3,
        upgradesTotal : 1,
        img : 'url'}];
    spyOn(service, 'getInventory').and.returnValue(of(item1));
    component.ngOnInit();
  });
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
});