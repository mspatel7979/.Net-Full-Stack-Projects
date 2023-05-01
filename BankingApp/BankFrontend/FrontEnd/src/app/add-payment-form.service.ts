import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './Interfaces/Card';
import { Account } from './Interfaces/Account';

@Injectable({
  providedIn: 'root'
})
export class PaymentFormService {
  constructor(private http: HttpClient) { }

  addCard(newCard: Card): Observable<Card> {
    return this.http.post('https://wiz-docker3.azurewebsites.net/Card/Add', newCard) as Observable<Card>;
  }

  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post('https://wiz-docker3.azurewebsites.net/Account/Add', newAccount) as Observable<Account>;
  }
}