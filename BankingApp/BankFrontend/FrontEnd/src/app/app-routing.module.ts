import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing/Landing.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HttpClient } from '@angular/common/http'
import { BusinessHomeComponent } from './business-home/business-home.component';
import { UserGuard } from './user.guard';
import { AddPaymentFormComponent } from './add-payment-form/add-payment-form.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component'
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { SendAndRequestComponent } from './send-and-request/send-and-request.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { BusinessGuard } from './business.guard';
import { PersonalGuard } from './personal.guard';


const routes: Routes = [

  { path: 'UserHome', component: UserHomeComponent, canActivate: [PersonalGuard] },
  { path: '', component: LandingComponent },
  { path: 'BusinessHome', component: BusinessHomeComponent, canActivate: [BusinessGuard] },
  { path: 'AddPayment', component: AddPaymentFormComponent, canActivate: [UserGuard] },
  { path: 'UserHome/Transactions', component: ViewAllTransactionsComponent, canActivate: [UserGuard] },
  { path: 'Transfer', component: TransferPageComponent, canActivate: [UserGuard] },
  { path: 'BusinessHome/Loan', component: LoanApplyComponent, canActivate: [BusinessGuard] },
  { path: 'SendAndRequest', component: SendAndRequestComponent, canActivate: [UserGuard] },
  { path: 'TransferMoney', component: TransferMoneyComponent, canActivate: [UserGuard] },
  { path: 'Wallet', component: WalletPageComponent, canActivate: [UserGuard] },
  { path: 'UserHome/Profile', component: UserProfileComponent, canActivate: [PersonalGuard] },
  { path: 'BusinessHome/Profile', component: BusinessProfileComponent, canActivate: [BusinessGuard] }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
