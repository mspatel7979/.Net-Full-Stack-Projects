import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
import { LzisApiService } from 'src/app/lzis-api.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  inventory : Item[] = []
  imgPH : string = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg";
  XapiRoot : string = "https://botw-compendium.herokuapp.com/api/v2/entry/";
  imgRoot : string = "/image"

  constructor(private api: LzisApiService, private cache : ItemCacheService, private http : HttpClient) { }

  ngOnInit(): void {
    if(this.cache.loggedIn) {
      this.api.getInventory(this.cache.user.userID? this.cache.user.userID : -1).subscribe(data  => {
        this.cache.Inventory = data;
        this.cache.Inventory.sort(function(a, b) {
          if(a.powerIncrease < b.powerIncrease) return -1;
              else if(a.powerIncrease > b.powerIncrease) return 1;
              else {
                  if(a.productID < b.productID) return -1;
                  else if(a.productID > b.productID) return 1;
                  else return 0;
              }
        })
        this.inventory = this.cache.Inventory
      })
    }
    else {
      this.cache.Inventory = [];
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
