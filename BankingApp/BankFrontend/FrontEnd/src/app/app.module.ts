import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { LandingComponent } from './Landing/Landing.component';
import { AuthModule } from '@auth0/auth0-angular';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDataService } from './user-data.service';
import { AddPaymentFormComponent } from './add-payment-form/add-payment-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewAllTransactionsComponent } from './view-all-transactions/view-all-transactions.component';
import { LoanApplyComponent } from './loan-apply/loan-apply.component';
import { TransferPageComponent } from './transfer-page/transfer-page.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { CookieService } from 'ngx-cookie-service';
import { cardTransform } from './CardTransformPipe';
import { SendAndRequestComponent } from './send-and-request/send-and-request.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { TransactionFilterPipe } from './transaction-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    LandingComponent,
    BusinessHomeComponent,
    NavbarComponent,
    AddPaymentFormComponent,
    ViewAllTransactionsComponent,
    LoanApplyComponent,
    TransferPageComponent,
    WalletPageComponent,
    TransferMoneyComponent,
    cardTransform,
    SendAndRequestComponent,
    UserProfileComponent,
    BusinessProfileComponent,
    TransactionFilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-z8ypmdswd2nbh4n2.us.auth0.com',
      clientId: 'Zq0rCWWoR0q3QHWpfAcT2wizKAqtTDYJ',
      authorizationParams: {
        redirect_uri: 'https://brave-mud-0bd752310.2.azurestaticapps.net/'
      }
    })
  ],
  providers: [UserDataService, CookieService, TransferMoneyComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
