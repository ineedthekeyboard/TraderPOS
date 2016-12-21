import {Component, OnInit, Input, HostBinding, trigger, transition, animate, style, state} from "@angular/core";
import {Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {OrdersService} from "../../services/orders.service";
import {Product} from "../../models/product.model";
import {Order} from "../../models/order.model";
import {Observable} from "rxjs";
//import "rxjs/Rx";

@Component({
  selector: 'app-cart-page',
  templateUrl: 'cart-page.component.html',
  styleUrls: ['cart-page.component.scss'],
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
export class CartPageComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @Input() productFilter: Observable<Product[]>;

  allProducts: Observable<Product[]> = Observable.from([]);
  productsToDisplay: Observable<Product[]> = Observable.from([]);
  productsOnOrder: any = Observable.from([]).toArray();
  //ordersServiceObj: any = Observable.from([]);

  constructor(private router: Router,
              private ordersService: OrdersService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.allProducts = this.productsService.getProducts();

    this.productsOnOrder = this.ordersService.getOrders();
  }

  onSearch(searchTerm: string) {
    if (searchTerm === '' || !searchTerm) {
      this.productsToDisplay = Observable.from([]);
    } else {
      this.productsToDisplay = this.allProducts.debounceTime(250).map(products => {
        return products.filter(p => p.Name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
      });
    }
  }

  onAddItem(searchTerm: string): void {
    if (searchTerm === '' || !searchTerm) {
      return
    } else {
      let productToAdd = [];
      let productsAdded = [];
      this.allProducts.subscribe(results => productToAdd = results);
      productToAdd = productToAdd.filter(p => p.Name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 1);
      if (productToAdd.length < 1) {
        return
      }
      this.productsOnOrder.subscribe(results => productsAdded = results);

      productToAdd[0].units = 'Tbsp';

      this.ordersService.create(productToAdd[0]).subscribe(results => {
        productsAdded.push(results);
        this.productsOnOrder = Observable.from(productsAdded).toArray();
      });
    }
  }

  deleteSpecificProduct(productToRemove: Order): void {
    let productsAfterRemoval = [];
    let currentProducts = [];
    this.productsOnOrder.subscribe(results => currentProducts = results);
    productsAfterRemoval = currentProducts.filter((obj) => {
      return obj.Id !== productToRemove.Id;
    });
    this.ordersService.deleteOrder(productToRemove).subscribe(result => {
      this.productsOnOrder = Observable.from(productsAfterRemoval).toArray();
    });
  }

  updateProductOnOrder(productOnOrder: Order) {
    this.ordersService.update(productOnOrder);
  }
}
