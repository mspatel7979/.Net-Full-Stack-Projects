import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';
import { Loan, LoanSchedule } from '../Interfaces/loan';
import { LoanServicesService } from '../loan-services.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import 'jspdf-autotable';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css']
})
export class LoanApplyComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private loanService: LoanServicesService, private formBuilder: FormBuilder, private userData: UserDataService, private cookieService: CookieService) { }
  loan: Loan = {
    id: 0,
    interestRate: 0,
    amount: 0,
    businessId: "0",
    monthlyPay: 0,
    dateLoaned: new Date(),
    loanPaid: new Date(),
    amountPaid: 0
  }
  existingLoan: Loan = {
    id: 0,
    interestRate: 0,
    amount: 0,
    businessId: "0",
    monthlyPay: 0,
    dateLoaned: new Date(),
    loanPaid: new Date(),
    amountPaid: 0
  }
  loanForm: FormGroup = this.formBuilder.group({
    amount: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    period: new FormControl(new Date(), [Validators.required]),
  })

  payLoanForm: FormGroup = this.formBuilder.group({
    payAmount: new FormControl('')
  })

  monthlyAmountButton: boolean = false;
  customAmountButton: boolean = false;
  fullAmountButton: boolean = false;

  interest: number = 0;
  amount: number = 0;
  business_type: string = "";
  period: number = 0;
  payment: number = 0;
  showCalculation: boolean = false;
  schedule: Array<LoanSchedule> = []

  loanDate: Date;

  ngOnInit() {
    this.getCurrentLoan().subscribe(data => {
      this.existingLoan = data as Loan;
      var newdate = new Date(this.existingLoan.loanPaid)
      newdate.setMonth(newdate.getMonth() + 1)
      this.existingLoan.loanPaid = newdate;


    });
  }



  getCurrentLoan(): Observable<any> {
    return this.loanService.getLoan(this.cookieService.get("userId") as unknown as number);
  }

  PMT(ir: any, np: any, pv: any, fv: any, type: any) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
      return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1)
      pmt /= (1 + ir);

    return pmt;
  }

  getPayoffDate(days: number): Date {
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate;
  }

  toggle() {
    if (this.loanForm.valid) {
      this.showCalculation = true;
    }
  }


  createSchedule() {
    if (this.loanForm.valid) {

      let dateincriment = 1
      let balance = this.amount
      let totInterest = 0
      let inter = parseFloat((this.amount * this.interest / 100 / 12).toFixed(2))
      let payment = this.PMT(this.interest / 1200, this.period, this.amount, 0, 0) * (-1)
      this.schedule = []

      while (true) {
        inter = balance * this.interest / 100 / 12
        balance = balance - payment + inter

        let date: Date = new Date()
        date.setMonth(date.getMonth() + dateincriment)
        let data: LoanSchedule = {
          date: date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          payment: parseFloat(payment.toFixed(2)),
          principal: parseFloat((payment - inter).toFixed(2)),
          interest: parseFloat(inter.toFixed(2)),
          totalInterest: parseFloat((totInterest + inter).toFixed(2)),
          balance: parseFloat(balance.toFixed(2))
        }
        dateincriment++
        if (balance < -1)
          break;

        totInterest = data.totalInterest
        this.schedule.push(data)
        console.log(data, date)
      }
    }
    else {
      this.interest = 0;
      this.amount = 0;
      this.payment = 0;
      this.business_type = ''
      this.showCalculation = false
    }
  }

  onLoanFormSubmit(event: Event) {
    if (this.loanForm.valid) {
      this.userData.retrieveBusinessTypeFromDB(this.cookieService.get('email')).subscribe((data: string) => {
        if (data) {
          this.business_type = data;
          this.amount = this.loanForm.controls['amount'].value

          let rate: number = 0;
          if (this.amount > 50000)
            rate = 25.25;
          else if (this.amount > 25000)
            rate = 18.75
          else if (this.amount > 10000)
            rate = 10.75
          else if (this.amount > 0)
            rate = 5.25

          if (this.business_type == "nonprofit")
            rate = parseInt((rate / 3.0).toFixed(2));
          if (this.business_type == "micro")
            rate = parseInt((rate / 2.0).toFixed(2));
          if (this.business_type == "small")
            rate = rate / 1.5;
          if (this.business_type == "large")
            rate = parseInt((rate / 1.0).toFixed(2));

          this.interest = rate

          this.period = this.loanForm.controls['period'].value

          this.payment = parseFloat(this.PMT(this.interest / 1200, this.period, this.amount, 0, 0).toFixed(2)) * (-1)
          if (isNaN(this.payment)) this.payment = 0;
        }
      })

    }
  }
  acceptLoan(): any {
    this.loan.interestRate = this.interest;
    this.loan.businessId = this.cookieService.get('userId');
    this.loan.amount = this.loanForm.controls['amount'].value;
    this.loan.monthlyPay = this.payment;
    this.loan.dateLoaned = new Date();
    this.loan.loanPaid = this.getPayoffDate(this.loanForm.controls['period'].value * 365)
    this.loanService.addNewLoan(this.loan)
      .subscribe(data => {
        this.router.navigate(['/BusinessHome'])
      })
  }

  toggleMonthlyBill() {
    this.monthlyAmountButton = true;
    this.customAmountButton = false;
    this.fullAmountButton = false;
  }

  toggleCustomBill() {
    this.monthlyAmountButton = false;
    this.customAmountButton = true;
    this.fullAmountButton = false;
  }

  toggleFullBill() {
    this.monthlyAmountButton = false;
    this.customAmountButton = false;
    this.fullAmountButton = true;
  }

  toggleAllBillButtons() {
    this.monthlyAmountButton = false;
    this.customAmountButton = false;
    this.fullAmountButton = false;
  }

  payLoan(amount: number): any {
    let principle = (this.existingLoan.amount - this.existingLoan.amountPaid) * (this.existingLoan.interestRate / 100)
    this.loanService.makePayment(principle, this.cookieService.get("userId") as unknown as number, amount).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }
  payFullLoan(): any {
    this.loanService.makePayment((this.existingLoan.amount - this.existingLoan.amountPaid), this.cookieService.get("userId") as unknown as number, (this.existingLoan.amount - this.existingLoan.amountPaid)).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }
  payCustomLoan(): any {

    this.loanService.makePayment(this.payLoanForm.controls['payAmount'].value, this.cookieService.get("userId") as unknown as number, this.payLoanForm.controls['payAmount'].value).subscribe(data => {
      console.log(data);
      location.reload();
    });
  }


  exportAsPDF() {
    var doc = new jsPDF.default();
    console.log(this.schedule.map(Object.values));
    (doc as any).autoTable({
      head: [['Payment Date', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance']],
      body: this.schedule.map(Object.values)
    })
    console.log("test2");
    doc.save('file.pdf');
  }

  Validate() {
    var s = document.getElementById("loanTerm")! as HTMLInputElement;
    if (parseInt(s.value) < 0)
      s.value = "";
    if (parseInt(s.value) > 60)
      s.value = "";
  }
}