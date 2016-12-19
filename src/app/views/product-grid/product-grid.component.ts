import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Product} from "../../models/product.model";
import {Order} from "../../models/order.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-grid',
  templateUrl: 'product-grid.component.html',
  styleUrls: ['product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  @Input() productsToDisplay: Observable<Product[]>;
  @Input() ordersToDisplay: Observable<Order[]>;
  @Input() storeMode: Boolean = false;
  @Input() orderMode: Boolean = false;
  @Input() summaryMode: Boolean = false;
  @Output() orderProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

  // summary: any = {
  //   totalCount: 0,
  //   totalCost: 0
  // };

  constructor() { }

  ngOnInit() {
    // if (this.ordersToDisplay && this.summaryMode) {
    //   this.ordersToDisplay.takeLast(1).subscribe(results => {
    //     debugger;
    //     for (let i in results) {
    //       results[i].number
    //     }
    //     console.log(results);
    //   });
    // }
  }
  // ngOnChanges(changes) {
  //   if (changes.products && changes.products.currentValue && changes.products.currentValue.length > 0) {
  //     for (let product of this.products) {
  //       this.summary.totalCost += (product.PricePerPound * product.number);
  //       this.summary.totalCount += product.number;
  //     }
  //   }
  // }

  productOrderPressed(product: Product) {
    this.orderProduct.emit(product);
  }

  productDeletePressed(product: Product) {
    this.deleteProduct.emit(product);
  }
}
