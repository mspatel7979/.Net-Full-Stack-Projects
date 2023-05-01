import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoggedInPageComponent } from './components/logged-in-page/logged-in-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'in',
    component: LoggedInPageComponent
  },
  // {
  //   path: 'in/cart',
  //   component: CartComponent
  // }
];  // use ":id" to indicate route param

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
