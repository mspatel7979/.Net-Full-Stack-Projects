import { Component } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
// import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-logged-in-page',
  templateUrl: './logged-in-page.component.html',
  styleUrls: ['./logged-in-page.component.scss']
})
export class LoggedInPageComponent{

  // subscription: Subscription;

  constructor(private cache : ItemCacheService, private router: Router) {
    // this.subscription = router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     browserRefresh = !router.navigated;
    //   }
    // });
  }


  // ngOnInit() : void {
  //   console.log(this.cache.user);

    // this.subscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     browserRefresh = !this.router.navigated;
    //   }
    //   // console.log(browserRefresh)
    // });
  // }

}
