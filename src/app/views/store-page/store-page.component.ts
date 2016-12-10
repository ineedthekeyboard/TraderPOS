import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {OrdersService} from '../../services/orders.service';
import {Product} from '../../models/product-model/product.model';
import {Order} from '../../models/order-model/order.model';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {
  pagetitle: String = 'Order Page';
  productsOrdered: Order[] = [];

  constructor(private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit() {
    this.ordersService.get().then((orders) => {
      this.productsOrdered = orders || [];
    });
  }

  onOrder(): void {
    debugger;
    for(let i=0; i < this.productsOrdered.length; i++) {
      this.ordersService.update(this.productsOrdered[i]);
    }
    this.router.navigate(['order']);
  }

  onProductSelected(product: Product) {
    // TODO: Check that the product is not already added.
    product.number = 1; // Make only one added now
    let newOrder = new Order(product);
    this.ordersService.create(newOrder).then((order) => {
      this.productsOrdered.push(order);
    });
  }

  deleteSelectProduct(order: Order) {
    this.ordersService.deleteOrder(order).then((order: Order)=>{
      let id = order.Id;
      this.productsOrdered = this.productsOrdered.filter(order => order.Id !== id);
      debugger;
    });

  }

}
