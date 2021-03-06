import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./local-data-services/in-memory-data.service";
import {AppComponent} from "./app.component";
import {OrderPageComponent} from "./views/order-page/order-page.component";
import {AppModalContentComponent} from "./views/modal-component/modal.component";
import {ProductsService} from "./services/products.service";
import {OrdersService} from "./services/orders.service";
import {UserService} from "./services/user.service";
import {AppRoutingModule} from "./app.router";
import {ProductSearchComponent} from "./views/product-search/product-search.component";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {LandingPageComponent} from "./views/landing-page/landing-page.component";
import {AccountPageComponent} from "./views/account-page/account-page.component";
import {LoginPageComponent} from "./views/login-page/login-page.component";
import {ProductsPageComponent} from "./views/products-page/products-page";
import {AdminPageComponent} from "./views/admin-page/admin-page.component";
import {ProductGridComponent} from "./views/product-grid/product-grid.component";
import {CartPageComponent} from "./views/cart-page/cart-page.component";

export const myFirebaseConfig = {
  apiKey: "AIzaSyAtYkq4VFsHKZBo_XmEUuU_hSF77_um6wk",
  authDomain: "muzirisspicetrade.firebaseapp.com",
  databaseURL: "https://muzirisspicetrade.firebaseio.com",
  storageBucket: "muzirisspicetrade.appspot.com",
  messagingSenderId: "926947141541"
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

//enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    OrderPageComponent,
    AppModalContentComponent,
    ProductSearchComponent,
    LandingPageComponent,
    AccountPageComponent,
    LoginPageComponent,
    ProductsPageComponent,
    OrderPageComponent,
    AdminPageComponent,
    ProductGridComponent,
    CartPageComponent
  ],
  entryComponents: [AppModalContentComponent],
  providers: [ProductsService, OrdersService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
