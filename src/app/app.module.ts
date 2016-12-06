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

@NgModule({
  imports: [
    BrowserModule,
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
    OrderTableComponent
  ],
  entryComponents: [AppModalContentComponent],
  providers: [ProductsService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
