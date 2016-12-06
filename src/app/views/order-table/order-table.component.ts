import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../models/product-model/product.model';

@Component({
  selector: 'app-order-table',
  templateUrl: 'order-table.component.html',
  styleUrls: ['order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  @Input() products: Product[];
  @Output() deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() summaryMode: Boolean;

  summary: any = {
    totalCount: 0,
    totalCost: 0
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.products && changes.products.currentValue && changes.products.currentValue.length > 0) {
      for (let product of this.products) {
        this.summary.totalCost += (product.price * product.number);
        this.summary.totalCount += product.number;
      }
    }

  }

  productDeletePressed(product: Product) {
    this.deleteProduct.emit(product);
  }

}
