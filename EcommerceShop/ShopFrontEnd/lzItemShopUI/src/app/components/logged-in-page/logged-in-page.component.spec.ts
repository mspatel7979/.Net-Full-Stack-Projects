import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedInPageComponent } from './logged-in-page.component';
import { CartComponent } from '../cart/cart.component';
import { ItemShopComponent } from '../item-shop/item-shop.component';
import { CharacterComponent } from '../character/character.component';
import { InventoryComponent } from '../inventory/inventory.component';

describe('LoggedInPageComponent', () => {
  let component: LoggedInPageComponent;
  let fixture: ComponentFixture<LoggedInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoggedInPageComponent,
        CartComponent,
        ItemShopComponent,
        CharacterComponent,
        InventoryComponent
      ],
      imports : [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
