import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCacheService } from 'src/app/item-cache.service';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let cache: ItemCacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterComponent ]
    })
    .compileComponents();

    cache = TestBed.inject(ItemCacheService);
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should cache.user.coinBank to be increment', () => {
      cache.user.coinBank = 0;
      cache.user.clickPower = 1;
      component.moneyButton();
      expect(cache.user.coinBank).toBe(1);
      expect(cache.user.clickPower).toBe(1);
  });
  it('should togglechar from true to false and again different', () => {
    cache.user.zeldaCharacter = 'false';
    cache.loggedIn = true;
    component.ngOnInit();
    expect(component.isZelda).toBeFalse();
    component.toggleChar();
    expect(component.isZelda).toBeTrue();
    expect(cache.user.zeldaCharacter).toBeTruthy();
    component.toggleChar();
    expect(component.isZelda).toBeFalse();
    expect(cache.user.zeldaCharacter).toBeTruthy();
  });
});