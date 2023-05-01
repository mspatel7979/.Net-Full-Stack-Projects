import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  addUser(arg0: string) {
    throw new Error('Method not implemented.');
  }

  apiRoot: any = "https://wiz-docker3.azurewebsites.net/";

  public email: any;
  public Id: any;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  public getUser(): string {
    return this.email;
  }
  public getUserEmailFromAuth0(user: string) {
    this.email = user;
  }
  public retrieveUserIdFromDB(email: string): Observable<number> {
    return this.http.get(this.apiRoot + "user/byEmail/" + email) as Observable<number>;
  }

  public getUserId(): number {
    return this.Id
  }

  public getUserCards(userId: number): Observable<Array<any>> {
    let qparams = new HttpParams()
      .set('userId', userId/*this.Id*/)
    return this.http.get(this.apiRoot + 'Card/User', { params: qparams }) as Observable<Array<any>>;
  }

  public getBusinessCards(id: number): Observable<Array<any>> {
    let qparams = new HttpParams()
      .set('userId', id);
    return this.http.get(this.apiRoot + "Card/Business", { params: qparams }) as Observable<Array<any>>;
  }

  public retrieveBusinessIdFromDB(email: string): Observable<number> {
    return this.http.get(this.apiRoot + "Business/busId/" + email) as Observable<number>;
  }


  public retrieveBusinessTypeFromDB(email: string): Observable<string> {
    return this.http.get(this.apiRoot + "Business/busType/" + email) as Observable<string>;
  }

  public getUserAccounts(userId: number): Observable<Array<any>> {
    let qparams = new HttpParams()
      .set('id', userId/*this.Id*/)
    return this.http.get(this.apiRoot + 'Account/UserAccounts', { params: qparams }) as Observable<Array<any>>;
  }

  public getBankAccounts(): Observable<Array<any>> {
    return this.http.get(this.apiRoot + "Account/Accounts") as Observable<Array<any>>;
  }

  public getFullPersonalUser(userId: number): Observable<Array<any>> {

    return this.http.get(this.apiRoot + "user/" + userId) as Observable<Array<any>>;
  }

  public updateUserProfile(userObj: any): Observable<Array<any>> {

    return this.http.put(this.apiRoot + "user/update", userObj) as Observable<Array<any>>;
  }

  public getFullBusinessUser(businessId: number): Observable<Array<any>> {

    return this.http.get(this.apiRoot + "Business/bus/" + businessId) as Observable<Array<any>>;
  }

  public updateBusinessProfile(businessObj: any): Observable<Array<any>> {

    return this.http.put(this.apiRoot + "Business/Update", businessObj) as Observable<Array<any>>;
  }

  public getWalletBalance(userId: number): Observable<any> {
    return this.http.get(this.apiRoot + "user/" + userId) as Observable<any>;
  }

  public getWalletBBalance(userId: number): Observable<any> {
    return this.http.get(this.apiRoot + "Business/bus/" + userId) as Observable<any>;
  }

  current_state = this.cookieService.get('userType');

  ParseBoolean(value: string | null): boolean {
    if (value != '')
      return true;
    else
      return false;
  }
  public $navbar_toggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.ParseBoolean(this.current_state))

  public authenticate() {
    this.$navbar_toggle.next(true);
  }

  public deauthenticate() {
    this.$navbar_toggle.next(false);
  }

  public getUser2(id: number): Observable<any> {
    return this.http.get(this.apiRoot + "user/" + id) as Observable<any>;
  }

  public updateUserWallet(id: number, amt: number): Observable<any> {
    return this.http.get(this.apiRoot + "user/wallet/update/" + id + "/" + amt) as Observable<any>;
  }

  public updateBusinessWallet(id: number, amt: number): Observable<any> {
    return this.http.get(this.apiRoot + "Business/wallet/update/" + id + "/" + amt) as Observable<any>;
  }
}
