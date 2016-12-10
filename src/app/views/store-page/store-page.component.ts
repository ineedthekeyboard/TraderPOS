import { Component, OnInit, Input, HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {OrdersService} from '../../services/orders.service';
import {Product} from '../../models/product-model/product.model';
import {Order} from '../../models/order-model/order.model';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from "rxjs";

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class StorePageComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }

  @Input() productFilter: Observable<Product[]>;

  productsToDisplay: Observable<Product[]> = Observable.from([]);

  constructor(private router: Router,
              private ordersService: OrdersService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsToDisplay = this.productsService.getProducts();
  }

  // onOrder(): void {
  //   debugger;
  //   for(let i=0; i < this.productsOrdered.length; i++) {
  //     this.ordersService.update(this.productsOrdered[i]);
  //   }
  //   this.router.navigate(['order']);
  // }

  // onProductSelected(product: Product) {
  //   // TODO: Check that the product is not already added.
  //   product.number = 1; // Make only one added now
  //   let newOrder = new Order(product);
  //   this.ordersService.create(newOrder).then((order) => {
  //     this.productsOrdered.push(order);
  //   });
  // }
  //
  // deleteSelectProduct(order: Order) {
  //   this.ordersService.deleteOrder(order).then((order: Order)=>{
  //     let id = order.Id;
  //     this.productsOrdered = this.productsOrdered.filter(order => order.Id !== id);
  //     debugger;
  //   });
  //
  //}

}
