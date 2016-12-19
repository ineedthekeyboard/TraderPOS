import {Component, OnInit, Input, HostBinding, trigger, transition, animate, style, state} from "@angular/core";
import {Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {OrdersService} from "../../services/orders.service";
import {Product} from "../../models/product.model";
import {Observable} from "rxjs";
import "rxjs/Rx";

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
  ordersServiceObj: any = Observable.from([]);

  constructor(private router: Router,
              private ordersService: OrdersService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.allProducts = this.productsService.getProducts();

    this.ordersServiceObj = this.ordersService.get();
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
      this.productsOnOrder.subscribe(results => productsAdded = results);
      // console.log(productToAdd);
      // console.log(productsAdded);
      // console.log(productsAdded.concat(productToAdd));
      // console.log(this.allProducts);
      // console.log(this.productsOnOrder);
      // debugger;
      //to service
      this.ordersService.create(productToAdd[0]);
      this.ordersServiceObj = this.ordersService.get();

      //to local observable
      //this.productsOnOrder = Observable.from(productsAdded.concat(productToAdd)).toArray();
    }
  }

  onOrder(product: Product): void {
    console.log(product);
    // this.router.navigate(['order']);
  }
}
