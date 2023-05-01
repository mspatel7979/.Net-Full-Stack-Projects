import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { JwtModule } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { UserDataService } from '../user-data.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';


@Component({
  selector: 'app-landing',
  templateUrl: './Landing.component.html',
  styleUrls: ['./Landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router, public authService: AuthService, public userData: UserDataService) { }
  async ngOnInit(): Promise<void> {
    if (this.authService.isAuthenticated$) {
      await this.authService.user$.subscribe(c => {
        if (c) {
          console.log(c)
          if (c["email"]) {
            console.log(c['email'])
            this.cookieService.set('email', c['email'], 0.4)
            // sessionStorage.setItem("loggedin", 'true')
            if (this.cookieService.get('userType') == 'Business') {
              this.userData.retrieveBusinessIdFromDB(this.cookieService.get('email')).subscribe(data => {
                if (data) {
                  this.cookieService.set("userId", data + "")
                  this.router.navigate(['/BusinessHome']);
                  this.userData.authenticate()
                }
              })
            }
            else if (this.cookieService.get('userType') == 'Personal') {
              this.userData.retrieveUserIdFromDB(this.cookieService.get('email')).subscribe(data => {
                if (data) {
                  this.cookieService.set("userId", data + "")
                  this.router.navigate(['/UserHome']);
                  this.userData.authenticate()
                }
              })
            }
          }
        }
      })
    }
  }


  async login() {
    await this.authService.logout()
    this.cookieService.set('userType', 'Personal', 0.4);
    this.authService.loginWithRedirect({ authorizationParams: { redirect_uri: 'https://brave-mud-0bd752310.2.azurestaticapps.net/' }, appState: { target: 'Personal' } })

  }
  async businessLogin() {
    await this.authService.logout();
    this.cookieService.set('userType', 'Business', 0.4)
    this.authService.loginWithRedirect({ authorizationParams: { redirect_uri: 'https://brave-mud-0bd752310.2.azurestaticapps.net/' }, appState: { target: 'Business' } })
  }
}
