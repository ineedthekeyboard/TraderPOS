import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { AccountPageComponent } from './views/account-page/account-page.component';
import { SignupPageComponent } from './views/signup-page/signup-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { OrderPageComponent } from './views/order-page/order-page.component';
import { StorePageComponent } from './views/store-page/store-page.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'order',  component: OrderPageComponent },
  { path: 'store', component: StorePageComponent },
  { path: 'store#messages', component: StorePageComponent },
  { path: 'admin', component: AdminPageComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
