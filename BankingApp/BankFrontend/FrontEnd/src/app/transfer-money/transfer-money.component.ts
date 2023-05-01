
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Card, bankAccount } from '../wallet-page/wallet-page.component';
import { TransferService } from '../transfer.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Component({
  selector: 'app-transfer-money-component',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  constructor(public service: TransferService, public user_service: UserDataService, private router: Router, private cookieService: CookieService) { }

  display = true;
  displayAdd = false;
  displayFinal = false;
  message: string = "this message";
  messagecall = false;
  messagecall1 = false;
  UID: any;
  _amount: any = "";
  cardDsiplay = true;
  bankDisplay = false;
  typeId: any = 0;
  type: any = "";
  cardList: Card[] = [];
  bankList: bankAccount[] = [];
  busi: boolean = false;

  ngOnInit(): void {
    if (this.cookieService.get('userType') == "Business") {
      this.busi = true;
    }
    this.setType("c");
    this.UID = parseInt(this.cookieService.get('userId'));
    this.displayAccounts(this.UID);
    this.displayCards(this.UID);
  }

  addToWallet() {
    this.display = false;
    this.displayAdd = true;
  }

  goToTp() {
    this.router.navigateByUrl('Transfer');
  }

  continue(amount: any) {
    this.displayAdd = false;
    this.displayFinal = true;
    this._amount += amount;
  }

  change() {
    if (this.displayFinal == true) {
      this.displayFinal = false;
      this.displayAdd = true
    } else if (this.displayAdd == true) {
      this.displayAdd = false;
      this.display = true;
    }
    // this.router.navigateByUrl('TransferMoney');
  }

  setType(type: any) {
    if (type == "b") {
      this.type = "b";
      this.cardDsiplay = false;
      this.bankDisplay = true;

      //populate with bank accounts
    } else {
      this.type = "c";
      this.bankDisplay = false;
      this.cardDsiplay = true;
      //populate with cards 

    }
  }

  addMoney() {
    if (this.busi == true) {
      this.addMoneyB();
    }
    else {
      if (this.type == "b") {
        const accountToWalletObs = this.service.accountToWallet(this.typeId, this.UID, this._amount, false);
        if (accountToWalletObs) {
          accountToWalletObs.subscribe(data => {
            if (data != null) {
              this.messagecall = true;
              this.message = "Successful transaction from bank to wallet"
            } else {
              this.messagecall1 = true;
              this.message = "Invalid transaction from card to wallet. Not enough money.";
              return;
            }
          });
        }
      }
      else {
        const cardToWalletObs = this.service.cardToWallet(this.typeId, this.UID, this._amount, false);
        if (cardToWalletObs) {
          cardToWalletObs.subscribe(data => {
            if (data != null) {
              this.messagecall = true;
              this.message = "Successful transaction from card to wallet"
            } else {
              this.messagecall1 = true;
              this.message = "Invalid transaction from card to wallet. Not enough money.";
              return;
            }
          });
        }
      }
    }
  }

  addMoneyB() {
    if (this.type == "b") {
      const accountToWalletObs = this.service.accountToWallet(this.typeId, this.UID, this._amount, true);
      if (accountToWalletObs) {
        accountToWalletObs.subscribe(data => {
          if (data != null) {
            this.messagecall = true;
            this.message = "Successful transaction from bank to wallet"
          } else {
            this.messagecall1 = true;
            this.message = "Invalid transaction from card to wallet. Not enough money.";
            return;
          }
        });
      }
    }
    else {
      const cardToWalletObs = this.service.cardToWallet(this.typeId, this.UID, this._amount, true);
      if (cardToWalletObs) {
        cardToWalletObs.subscribe(data => {
          if (data != null) {
            this.messagecall = true;
            this.message = "Successful transaction from card to wallet"
          } else {
            this.messagecall1 = true;
            this.message = "Invalid transaction from card to wallet. Not enough money.";
            return;
          }
        });
      }
    }
  }

  displayCards(id: any) {
    if (this.busi == true) {
      this.user_service.getBusinessCards(id).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let card = {} as Card;
          card.cardId = data[i]['id'];
          card.balance = data[i]['balance'];
          card.cardNumber = data[i]['cardNumber'];
          card.cvv = data[i]['cvv'];
          card.expDate = data[i]['expiryDate'];
          this.cardList.push(card);
        }
      });
    }
    else {
      this.user_service.getUserCards(id).subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          let card = {} as Card;
          card.cardId = data[i]['id'];
          card.balance = data[i]['balance'];
          card.cardNumber = data[i]['cardNumber'];
          card.cvv = data[i]['cvv'];
          card.expDate = data[i]['expiryDate'];
          this.cardList.push(card);
        }
      });
    }
  }

  displayAccounts(id: any) {
    if (this.busi == true) {
      this.user_service.getBankAccounts().subscribe(data => {
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]['businessId'] == id) {
              let bacct = {} as bankAccount;
              bacct.acctNum = data[i]['accountNumber'];
              bacct.balance = data[i]['balance'];
              bacct.bankAcctId = data[i]['id'];
              this.bankList.push(bacct);
            }
          }
        }
      });
    }
    else {
      this.user_service.getUserAccounts(id).subscribe(data => {
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            let bacct = {} as bankAccount;
            bacct.acctNum = data[i]['accountNumber'];
            bacct.balance = data[i]['balance'];
            bacct.bankAcctId = data[i]['id'];
            this.bankList.push(bacct);
          }
        }
      });
    }

  }

  setCard(id: any) {
    this.typeId = id;
  }

  setBAcct(id: any) {
    this.typeId = id;

  }
}
