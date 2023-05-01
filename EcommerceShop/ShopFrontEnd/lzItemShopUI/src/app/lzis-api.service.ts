import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './models/item';
import { User } from './models/user';
import { ItemCacheService } from './item-cache.service';

@Injectable({
  providedIn: 'root'
})

export class LzisApiService {

  //apiRoot : string = 'http://localhost:5070/';
  apiRoot : string = 'https://lzitest.azurewebsites.net/';

  constructor(private http: HttpClient, private cache : ItemCacheService) { }

  // log in, if true get credentials
  userLogIn(userLogin : User) : Observable<User> {
    let qparams = new HttpParams()
    .set('username', userLogin.username? userLogin.username : "")
    .set('password', userLogin.password? userLogin.password : "")
    return this.http.get(this.apiRoot + 'User/Login', {params : qparams}) as Observable<User>;
  }

  // register for account
  userRegister(newUser : User) : Observable<User> {
    return this.http.post(this.apiRoot + 'User/Register', newUser) as Observable<User>;
  }

  // get a list of products for item shop
  getItemShop(userID : number) : Observable<Array<Item>> {
    let qparams = new HttpParams().set("u_id", userID);

    return this.http.get<Array<Item>>(this.apiRoot + 'Inventory/UnOwn/List', {
      params: qparams
    });
  }

  // get a list of products for cart
  getCart(userID : number) : Observable<Array<Item>> {
    let qparams = new HttpParams().set("u_id", userID);

    return this.http.get(this.apiRoot + 'Cart/User', {params:qparams}) as Observable<Array<Item>>;
  }

  getInventory(userID : number) : Observable<Array<Item>> {
    let qparams = new HttpParams().set("u_id", userID);

    return this.http.get(this.apiRoot + 'Inventory/Own/List', {params:qparams}) as Observable<Array<Item>>;
  }

  addToCart(productID : number) {
    let qBody = {
      userID: this.cache.user.userID,
      productID: productID
    }

    this.http.post(this.apiRoot + 'Cart/Product/Add', qBody).subscribe(data => {
      console.log(data)
    })
  }

  // move items from cart to user inventory
  checkout(userID : number) {
    // move everything from cart into inventory
    if(userID != -1) {
      let itemsToBuy = this.cache.Cart
      for(let i = 0; i < itemsToBuy.length; i++) {
        const headers = { 'content-type': 'application/json'}  
        let reqBody = JSON.stringify({
          userID: userID,
          productID: itemsToBuy[i].productID
        })
        this.http.post(this.apiRoot + 'Inventory/Own/List/Add/Product', reqBody, { headers: headers, observe: 'response' }).subscribe(data => {
          // console.log(data)
        });
        
        this.deleteItemFromCart(itemsToBuy[i].productID);

      }
    }


  }

  deleteItemFromCart(productID : number) {
    const headers = { 'content-type': 'application/json'}  
    let reqBody = JSON.stringify({
      userID : this.cache.user.userID,
      productID : productID
    })
    this.http.delete(this.apiRoot + 'Cart/Product/Delete', {body : reqBody, headers: headers}).subscribe(data => {
      console.log(data)
    })
  }

  updateUser() {
    // calls backend to update user info
    if(this.cache.user.charZelda) this.cache.user.zeldaCharacter = "Zelda"
    else { this.cache.user.zeldaCharacter = "Link" }
    let reqBody = {
      "userID": this.cache.user.userID,
      "username": this.cache.user.username,
      "password": this.cache.user.password,
      "zeldaCharacter": this.cache.user.zeldaCharacter,
      "coinBank": this.cache.user.coinBank,
      "clickPower": this.cache.user.clickPower,
      "charZelda" : this.cache.user.charZelda
    }
    this.http.put(this.apiRoot + 'User/Update/Coins', reqBody).subscribe(data => {
      console.log("User's updated coin bank : " + data)
    });
    this.http.put(this.apiRoot + 'User/Update/Power', reqBody).subscribe(data => {
      console.log("User's new power: " + data)
    });
  }

  getimage(imgname : string) : Observable<any>{
    const XapiRoot = "https://botw-compendium.herokuapp.com/api/v2/entry/";

    return this.http.get(XapiRoot + imgname) as Observable<any>;
  }
}
