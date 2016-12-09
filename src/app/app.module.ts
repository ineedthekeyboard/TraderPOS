import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './local-data-services/in-memory-data.service';

import { AppComponent } from './app.component';
import { OrderPageComponent } from './views/order-page/order-page.component';
import { OrderSummaryComponent } from './views/order-summary/order-summary.component';
import { AppModalContentComponent } from './views/modal-component/modal.component';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';
import { AppRoutingModule } from './app.router';
import { ProductSearchComponent } from './views/product-search/product-search.component';
import { OrderTableComponent } from './views/order-table/order-table.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { AccountPageComponent } from './views/account-page/account-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { SignupPageComponent } from './views/signup-page/signup-page.component';
import { StorePageComponent } from './views/store-page/store-page.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';

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


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    OrderSummaryComponent,
    OrderPageComponent,
    AppModalContentComponent,
    ProductSearchComponent,
    OrderTableComponent,
    LandingPageComponent,
    AccountPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    StorePageComponent,
    OrderPageComponent,
    AdminPageComponent
  ],
  entryComponents: [AppModalContentComponent],
  providers: [ProductsService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
