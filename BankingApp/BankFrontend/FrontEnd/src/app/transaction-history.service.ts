import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './Interfaces/transaction';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionHistoryService {

  constructor(private http: HttpClient, private userData: UserDataService) { }
  getMostRecentTransactions(id: number): Observable<Array<Transaction>> {
    return this.http.get("https://wiz-docker3.azurewebsites.net/Transaction/transaction/number/" + this.userData.getUserId()) as Observable<Array<Transaction>>;
  }
  getTransactions(id: number): Observable<Array<Transaction>> {

    return this.http.get("https://wiz-docker3.azurewebsites.net/Transaction/transaction/" + this.userData.getUserId()) as Observable<Array<Transaction>>;

  }

  getTransactionsRequest(id: number): Observable<Array<Transaction>> {

    return this.http.get("https://wiz-docker3.azurewebsites.net/Transaction/transaction/" + id) as Observable<Array<Transaction>>;

  }
}
