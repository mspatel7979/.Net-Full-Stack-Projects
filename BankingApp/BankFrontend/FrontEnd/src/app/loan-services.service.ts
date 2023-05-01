import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from './Interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanServicesService {

  constructor(private httpClient: HttpClient) { }
  addNewLoan(loan: Loan): Observable<any> {
    return this.httpClient.post("https://wiz-docker3.azurewebsites.net/Loan/New", loan, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  makePayment(payment: number, id: number, amount: number): Observable<any> {
    return this.httpClient.put("https://wiz-docker3.azurewebsites.net/Loan/Pay/" + id + '/' + amount + '/' + payment, { headers: new HttpHeaders({ "Content-Type": "application/json" }) })
  }

  getLoan(id: number) {
    return this.httpClient.get("https://wiz-docker3.azurewebsites.net/Loan/Info/" + id);
  }
}
