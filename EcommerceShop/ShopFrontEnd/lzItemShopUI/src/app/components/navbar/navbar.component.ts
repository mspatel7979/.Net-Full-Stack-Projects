import { Component, Inject, OnInit } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LzisApiService } from 'src/app/lzis-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn : boolean = true;

  constructor(private cache : ItemCacheService, private router : Router,
    private activatedRouter : ActivatedRoute, private api : LzisApiService) {
    this.loggedIn = this.cache.loggedIn;
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(url => {
      // console.log("params:", url['in']);

      if(url['in']) {
        if(!this.cache.loggedIn) {
          this.router.navigateByUrl('')
        }
        else{
          this.cache.loggedIn = true;
          this.loggedIn = true;
        }
      }
      else { 
        this.loggedIn = false;
        this.cache.loggedIn = false;
      }
    })
  }
  
  logOut() {
    this.api.updateUser();
    // console.log(this.cache);
    this.cache.clearCache();
    // console.log(this.cache);
    this.router.navigateByUrl('');
  }

  toggleCart() {
    this.cache.viewCart = !this.cache.viewCart;
  }

}
