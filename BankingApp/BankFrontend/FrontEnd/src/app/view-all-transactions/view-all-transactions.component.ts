import { Component, OnInit } from '@angular/core';
import { Transaction } from '../Interfaces/transaction';
import { UserDataService } from '../user-data.service';
import { TransactionHistoryService } from '../transaction-history.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';
import { overflowWrap } from 'html2canvas/dist/types/css/property-descriptors/overflow-wrap';
import { TransactionFilterPipe } from '../transaction-filter.pipe';
@Component({
  selector: 'app-view-all-transactions',
  templateUrl: './view-all-transactions.component.html',
  styleUrls: ['./view-all-transactions.component.css']
})
export class ViewAllTransactionsComponent implements OnInit {
  Transactions: Array<Transaction> = [];
  user: string | undefined;
  viewTransact: boolean = false;
  transacDetails: Transaction;
  transacString: string;

  constructor(private cookieService: CookieService, private userData: UserDataService, private _transactions: TransactionHistoryService) { }

  ngOnInit(): void {
    this.userData.retrieveUserIdFromDB(this.cookieService.get('email')).subscribe(x => {
      this.userData.Id = x;
      this.user = this.cookieService.get('email');
      this._transactions.getTransactions(x).subscribe(w => {
        this.Transactions = w;
      })
    })
  }

  viewTransaction(event: Event) {
    // let element = (event.target as HTMLInputElement)
    // element.style.whiteSpace = 'overflowWrap'

    this.transacString = (event.target as HTMLInputElement).textContent as string;
    // console.log("view transaction clicked: ", this.viewTransact)
    if (this.viewTransact) { }
    else this.viewTransact = !this.viewTransact
    console.log((event.target as HTMLInputElement).textContent)

  }

  toggleExit() {
    this.viewTransact = !this.viewTransact;
  }

}