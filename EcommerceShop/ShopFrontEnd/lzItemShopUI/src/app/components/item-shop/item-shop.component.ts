import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
import { LzisApiService } from 'src/app/lzis-api.service';
import { Item } from '../../models/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-shop',
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.css']
})
export class ItemShopComponent implements OnInit {

  itemShop : Array<Item> = [];
  imgPH : string = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg";
  XapiRoot : string = "https://botw-compendium.herokuapp.com/api/v2/entry/";
  imgRoot : string = "/image"
  
  constructor(private api: LzisApiService, private cache : ItemCacheService, private http : HttpClient) { }

  // WORKS!! DO NOT TOUCH
  ngOnInit(): void {
    if(this.cache.loggedIn) {
      this.api.getItemShop(this.cache.user.userID? this.cache.user.userID : -1).subscribe(data => {
        this.cache.ItemShop = data;
        this.itemShop = this.cache.ItemShop;
      })
    }
    else {
      this.cache.ItemShop = [];
    }
  }

  getItemImage(itemName : string)  : any {
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

    this.http.get(this.XapiRoot + itemName).subscribe(res => {
      const data = <apiItem>res;
      console.log(data.data);
      return data.data.image? data.data.image : this.imgPH;
    })
  }

  ngOnDestroy(): void {
      // Useful for any clean up work on resources angular doesn't manage for you
  }
  ngOnChanges(changes: SimpleChanges): void {
      // if you want to tap into any changes that is happening in this component class and react upon it
  }

  addToCart(itemID: number) {
    if(!this.cache.Cart.find(item => item.productID == itemID) && !this.cache.Inventory.find(item => item.productID == itemID)) {
      this.api.addToCart(itemID)

      const itemToCart = this.cache.ItemShop.find(item => item.productID == itemID)
      if(itemToCart) this.cache.Cart.push(itemToCart)
      
      this.cache.ItemShop.forEach((item, index) => {
        if(item.productID == itemID) this.cache.ItemShop.splice(index, 1)
      })
    }
  }
  
}
