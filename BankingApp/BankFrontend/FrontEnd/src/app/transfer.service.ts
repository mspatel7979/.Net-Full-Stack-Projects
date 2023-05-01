import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransferService {



  apiRoot: string = 'https://wiz-docker3.azurewebsites.net/';

  constructor(private http: HttpClient) { }
  //When sending money to self, recipient = id, sender = null
  //TODO: wrap functions to accept name email etc
  //Card-to-wallet
  cardToWallet(cardId: number, userId: number, amount: number, type: boolean): Observable<any> {
    var body: Transaction = {
      "cardId": cardId,
      "description": "Transfer",
      "recipientId": userId,
      "amount": amount,
      "recpientType": type
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=3', body) as Observable<any>;

  }

  //wallet-to-card
  walletToCard(userId: number, cardId: number, amount: number, type: boolean): Observable<any> {
    var body: Transaction = {
      "senderId": userId,
      "description": "Transfer",
      "cardId": cardId,
      "amount": amount,
      "senderType": type,
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=2', body) as Observable<any>;
  }

  //bankAccount-to-wallet
  accountToWallet(accountId: number, userId: number, amount: number, type: boolean): Observable<any> {
    var body: Transaction = {
      "accountId": accountId,
      "description": "Transfer",
      "recipientId": userId,
      "amount": amount,
      "recpientType": type
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=4', body) as Observable<any>;
  }

  //wallet-to-bankAccount
  walletToAccount(userId: number, accountId: number, amount: number, type: boolean): Observable<any> {
    var body: Transaction = {
      "accountId": accountId,
      "description": "Transfer",
      "senderId": userId,
      "amount": amount,
      "senderType": type
    };
    return this.http.post(this.apiRoot + 'Transaction/transaction/internal?type=1', body) as Observable<any>;
  }

  requestMoney(userId: number, amount: number, recipientId: number, description: string, stype: boolean, rtype: boolean): Observable<any> {
    var body: Transaction = {
      "amount": amount,
      "description": "Request: " + description,
      "recipientId": userId,
      "status": 1,
      "senderId": recipientId,
      "senderType": rtype,
      "recpientType": stype
    };
    return this.http.post(this.apiRoot + "Transaction/", body) as Observable<any>;
  }

  userToUser(userId: number, amount: number, recipientId: number, description: string, stype: boolean, rtype: boolean): Observable<any> {
    var body: Transaction = {
      "amount": amount,
      "description": description,
      "recipientId": recipientId,
      "status": 0,
      "senderId": userId,
      "senderType": stype,
      "recpientType": rtype
    };
    return this.http.post(this.apiRoot + "Transaction/transaction/userToUser", body) as Observable<any>;
  }


  updateRequest(userId: number, recipientId: number, transac: any): Observable<any> {
    var body: Transaction = {
      "id": transac.id,
      "amount": transac.amount,
      "createdAt": transac.Date,
      "description": transac.description,
      "recipientId": recipientId,
      "status": 0,
      "senderId": userId,
      "senderType": transac.rType,
      "recpientType": transac.sType
    };
    return this.http.put(this.apiRoot + "Transaction/", body) as Observable<any>

  }
}
