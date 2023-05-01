import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './models/item';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class ItemCacheService {

  loggedIn = false;
  viewCart : any = false;
  emptyUser : User = {}
  user : User = {
    // userID: 9,
    // username: "alice",
    // password: "alice1234",
    // zeldaCharacter: "true",
    // coinBank: 1001,
    // clickPower: 51
  };
  ItemShop : Array<Item> = [];
  Inventory : Array<Item> = [];
  Cart : Array<Item> = [];

  constructor() { }

  clearCache() : void {
    this.loggedIn = false;
    this.user = {};
    this.ItemShop = [];
    this.Inventory = [];
    this.Cart = [];
  }

  fillCache(user : User, ItemShop : Array<Item>, Inventory : Array<Item>, Cart : Array<Item>) {
    console.log("Inserting into cache");
    this.user = user;
    this.ItemShop = ItemShop;
    this.Inventory = Inventory;
    this.Cart = Cart;
    this.loggedIn = true;
  }

  updateCart(addItemToCart : Item) {
    console.log("Updating cart");
    this.Cart.push(addItemToCart);
  }

}
