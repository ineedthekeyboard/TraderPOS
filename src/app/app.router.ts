import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./views/landing-page/landing-page.component";
import {CartPageComponent} from "./views/cart-page/cart-page.component";
import {AccountPageComponent} from "./views/account-page/account-page.component";
import {LoginPageComponent} from "./views/login-page/login-page.component";
import {OrderPageComponent} from "./views/order-page/order-page.component";
import {ProductsPageComponent} from "./views/products-page/products-page";
import {AdminPageComponent} from "./views/admin-page/admin-page.component";


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  {path: 'cart', component: CartPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'order',  component: OrderPageComponent },
  {path: 'products', component: ProductsPageComponent},
  { path: 'admin', component: AdminPageComponent }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
