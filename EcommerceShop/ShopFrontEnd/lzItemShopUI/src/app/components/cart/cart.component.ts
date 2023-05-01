import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
import { LzisApiService } from 'src/app/lzis-api.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  itemCart : Item[] =[]
  viewCart : boolean = false;
  imgPH : string = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg";
  XapiRoot : string = "https://botw-compendium.herokuapp.com/api/v2/entry/";
  imgRoot : string = "/image"

  constructor(private api: LzisApiService, public cache : ItemCacheService, private http : HttpClient) { }
  // find a way to have cache private so not everyone can access it
  // or use JWT to store user object

  ngOnInit(): void {
    if(this.cache.loggedIn) {
      this.api.getCart(this.cache.user.userID? this.cache.user.userID : -1).subscribe(data => {
        this.cache.Cart = data;
        this.itemCart = this.cache.Cart;
        this.viewCart = this.cache.viewCart;
      })
    } else {
      this.cache.Cart = [];
    }
  }

  exitCart() {
    this.cache.viewCart = false;
  }

  removeItem(itemID : number) {
    // console.log(itemID)
    const itemRemoval = this.cache.Cart.find(item => item.productID == itemID)
    if(itemRemoval) this.cache.ItemShop.push(itemRemoval)
    this.cache.ItemShop.sort(function(a, b) {
      if(a.powerIncrease < b.powerIncrease) return -1;
          else if(a.powerIncrease > b.powerIncrease) return 1;
          else {
              if(a.productID < b.productID) return -1;
              else if(a.productID > b.productID) return 1;
              else return 0;
          }
    })

    this.api.deleteItemFromCart(itemID)
    this.cache.Cart.forEach((item, index) => {
      if(item.productID == itemID) this.cache.Cart.splice(index, 1)
    });
  }

  checkout() {
    // console.log(this.cache.user.userID)
    if(this.cache.user.userID) {

      let addedPower = 0;
      let totalCostOfCart = 0;
      for(let item of this.cache.Cart) {
        addedPower += item.powerIncrease;
        totalCostOfCart += item.price;
      }

      if(this.cache.user.coinBank && this.cache.user.coinBank >= totalCostOfCart) { 
        this.cache.user.coinBank -= totalCostOfCart;
        for(let item of this.cache.Cart) {
          this.cache.Inventory.push(item)
        }
        this.cache.Inventory.sort(function(a, b) {
          if(a.powerIncrease < b.powerIncrease) return -1;
              else if(a.powerIncrease > b.powerIncrease) return 1;
              else {
                  if(a.productID < b.productID) return -1;
                  else if(a.productID > b.productID) return 1;
                  else return 0;
              }
        })

        // this adds item from cart to inventory as well as delete from cart
        this.api.checkout(this.cache.user.userID)
        this.cache.Cart = [];
        this.itemCart = [];
        if(this.cache.user.clickPower) this.cache.user.clickPower += addedPower

        // update user's power and bank
        this.api.updateUser()
      }
      else{
        alert("Not enough rupees to make this purchase! Please remove some items or earn more.")
      }
    }
  }

  getItemImage(itemName : string) : any {
    type apiItem = {
      data : {
        attack? : number,
        category? : string,
        common_locations? : string[],
        defense?: number,
        description? : string,
        id? : number,
        image? : string,
        name? : string
      }
    }
    
    var response : string = "";

    this.http.get(this.XapiRoot + itemName).subscribe(res => {
      const data = <apiItem>res;
      console.log(data.data);
      return data.data.image? data.data.image : this.imgPH;
    })
  }

}
