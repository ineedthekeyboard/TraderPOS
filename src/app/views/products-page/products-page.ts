import {Component, OnInit, Input, HostBinding, trigger, transition, animate, style, state} from "@angular/core";
import {Router} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {OrdersService} from "../../services/orders.service";
import {Product} from "../../models/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-store-page',
  templateUrl: 'products-page.html',
  styleUrls: ['products-page.scss'],
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
export class ProductsPageComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }

  @Input() productFilter: Observable<Product[]>;

  allProducts: Observable<Product[]> = Observable.from([]);
  productsToDisplay: Observable<Product[]> = Observable.from([]);

  constructor(private router: Router,
              private ordersService: OrdersService,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.allProducts = this.productsService.getProducts();
    this.productsToDisplay = this.productsService.getProducts();
  }
  onSearch(searchTerm: string) {
    if (searchTerm === '' || !searchTerm) {
      this.productsToDisplay = this.allProducts;
    } else {
      this.productsToDisplay = this.allProducts.debounceTime(250).map(products => {
        return products.filter(p => p.Name.toLowerCase().includes(searchTerm.toLowerCase()))
      });
    }
  }

  onOrder(product: Product): void {
    console.log(product);
    // this.router.navigate(['order']);
  }
}
