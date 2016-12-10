import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product-model/product.model';
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-grid',
  templateUrl: 'product-grid.component.html',
  styleUrls: ['product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
  @Input() productsToDisplay: Observable<Product[]>;
  @Input() orderMode: Boolean;
  @Output() orderProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

  // summary: any = {
  //   totalCount: 0,
  //   totalCost: 0
  // };

  constructor() { }

  ngOnInit() {
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
