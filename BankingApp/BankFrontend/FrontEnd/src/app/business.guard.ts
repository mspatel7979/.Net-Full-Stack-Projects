import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) { }
  canActivate(
    route: ActivatedRouteSnapshot | null,
    state: RouterStateSnapshot | null): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cookieService.get('userType') == 'Business' && this.cookieService.get('userId')) {
      return true;

    } else {
      this.router.navigate(['/'])
      return false;
    }
  }

}
