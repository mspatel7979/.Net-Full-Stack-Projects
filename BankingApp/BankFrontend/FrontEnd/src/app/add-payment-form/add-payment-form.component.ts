import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Card } from '../Interfaces/Card';
import { Account } from '../Interfaces/Account';
import { PaymentFormService } from '../add-payment-form.service';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-payment-form',
  templateUrl: './add-payment-form.component.html',
  styleUrls: ['./add-payment-form.component.css']
})

export class AddPaymentFormComponent implements OnInit{
  mode : string = "credit";

  constructor(private router: Router, private fb: FormBuilder, private pfs: PaymentFormService, private uds: UserDataService, private cookie: CookieService){}

  ngOnInit(): void {
    if (this.cookie.get('userType') === 'Personal') {
      console.log('Personal');
      this.uds.getUser();
      this.uds.retrieveUserIdFromDB(this.uds.getUser()).subscribe(data => {
        this.uds.Id = data;
        this.CardModel.UserId = this.uds.Id;
        this.AccModel.UserId = this.uds.Id;
      });
    }
    else if (this.cookie.get('userType') === 'Business') {
      console.log('Business');
      this.uds.getUser();
      this.uds.retrieveBusinessIdFromDB(this.uds.getUser()).subscribe(data => {
        this.uds.Id = data;
        this.CardModel.BusinessId = this.uds.Id;
        this.AccModel.BusinessId = this.uds.Id;
      });
    }
  }

  navigate() : void {
    if (this.cookie.get('userType') === 'Personal') { this.router.navigate(['/UserHome']); }
    else if (this.cookie.get('userType') === 'Business') {this.router.navigate(['/BusinessHome']); }
  }

  toggleMode(mode : string) : void {
    this.mode = mode;
  }
  AccModel : Account = {};
  CardModel : Card = {};
  cardnum : string = "";
  cardcvv : string = "";
  expiryDate : string = "";

  confirm = (form: NgForm) => {
    if (form.valid) {
      if (this.mode === 'credit'){
        this.CardModel.Balance = 100.00;
        this.CardModel.CardNumber = parseInt(this.cardnum);
        this.CardModel.Cvv = parseInt(this.cardcvv);
        this.CardModel.ExpiryDate = new Date(this.expiryDate);
        this.pfs.addCard(this.CardModel).subscribe(
          data => {
            console.log(data);
            this.navigate();
          },
          error => {
            console.log(error);
            alert("Card Already Taken");
          });
      } 
      else if (this.mode === 'bank'){
        this.AccModel.Balance = 100.0;
        this.pfs.addAccount(this.AccModel).subscribe(
          data => {
            console.log(data);
            this.navigate();
          },
          error => {
            console.log(error);
            alert("Card Already Taken");
          });
      }
    }
  }
}
