import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private cookieService: CookieService, private authService: AuthService, public userData: UserDataService, private router: Router) { }
  Logout(): void {
    this.cookieService.set('userType', '')
    this.cookieService.set('email', '')
    this.authService.logout()
    this.userData.deauthenticate()
  }
  goToWallet() {
    this.router.navigateByUrl('Wallet');
  }
}