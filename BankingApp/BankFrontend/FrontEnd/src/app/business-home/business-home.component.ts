import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { JwtDecoderService } from '../jwt-decoder.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Transaction } from '../Interfaces/transaction';
import { TransactionHistoryService } from '../transaction-history.service';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css']
})
export class BusinessHomeComponent implements OnInit {
  Transactions: Array<Transaction> = []
  user: string | undefined;
  token: string | undefined | null = localStorage.getItem('access_token');
  _wallet: any = "";
  constructor(private jwtDecoder: JwtDecoderService, public userData: UserDataService, public cookieService: CookieService, private router: Router, public authService: AuthService, private transactions: TransactionHistoryService) { }

  ngOnInit(): void {
    this.userData.email = this.cookieService.get('email')

    console.log(this.userData.getUser())
    this.userData.retrieveBusinessIdFromDB(this.userData.getUser()).subscribe(x => {
      this.userData.Id = x as number;
      this.user = this.userData.Id;
      this.getWalletAmount(this.cookieService.get('userId'));
      this.transactions.getMostRecentTransactions(x).subscribe(w => {
        this.Transactions = w;
      })
    })
  }
  getWalletAmount(id: any) {
    //getWalletBalance
    this.userData.getWalletBBalance(id).subscribe(data => {
      this._wallet = data[0]['wallet'];

    });
  }
}



